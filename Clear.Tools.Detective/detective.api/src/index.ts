import Detective from './detective/detective';
import LayoutV1 from './detective/layout/v1';
import PrintScreen from './browser/print-screen';
import { TestFlow, TestEvidence, TestEvidenceStatus, EvidenceFile, TestTableDto } from './detective/model/test-dto.model'
import { TestFlowJob, TestImageCommand, TestTable, TestTableHeader, TestTableLine } from './detective/model/test.model';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import DB from './db/connect';
import Flow, { FlowDocument } from './db/flow.document'
import Evidence, { EvidenceDocument } from './db/evidence.document'
import path from 'path';
import Variable from './utils/variable';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

DB.connect()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const basePath = './';
const json = path.join(basePath, 'json');
const collected = path.join(basePath, 'collected');
const collectedTemp = path.join(collected, 'temp');

createDir(json);
createDir(collected);
createDir(collectedTemp);

app.use('/collected', express.static('collected'))

app.get('/flow', (req, res) => {
    Flow.find({}, (err, flows) => {
        if (err)
            return res.status(500).send(err);

        res.send(flows);
    });
});

app.get('/flow/:id', (req, res) => {
    Flow.findById(req.params.id, (err, flow) => {
        if (err)
            return res.status(500).send(err)

        res.send(flow)
    });
});

app.post('/flow/create', (req, res) => {
    const flow = <TestFlow>req.body.content;

    if (!flow['_id']) {
        flow['_id'] = undefined;
        const newFlow = new Flow(flow);
        newFlow.save();
        res.send(true)
        return;
    }

    Flow.updateOne({ _id: flow['_id'] }, flow, (err, result) => res.send(true));
});

app.post('/flow/delete', (req, res) => {
    Flow.deleteOne({ _id: req.body.id }, (err) => res.send(true));
});

app.get('/evidence', (req, res) => {
    Evidence.find({}, (err, evidences) => {
        if (err)
            return res.status(500).send(err);

        evidences.forEach(ev => ev.flows.forEach(f => {
            ev.errorMessages = [],
                f.variables = []
        }));
        res.send(evidences);
    });
});

app.post('/evidence', async (req, res) => {
    const flow = <TestEvidence>JSON.parse(req.body.content);
    flow.status = TestEvidenceStatus.New;
    const evidence = new Evidence(flow);
    evidence.save();
    res.send(true);
});

app.post('/test', async (req, res) => {
    let isSucess = true;
    let testedFlow;

    try {
        const flow = <TestEvidence>JSON.parse(req.body.content);
        testedFlow = await createEvidencesStandalone(flow);

        testedFlow.flows.forEach(f => f.tables.forEach(t => t.lines.forEach(l => {
            if (l.result != 'Passou') {
                isSucess = false;
            }
        })));
    } catch (error) {
        isSucess = false;
    }

    const message = {
        videoUrl: (isSucess ? testedFlow.flows[0].tables[0].lines[0].videoUrl : null),
        status: (isSucess ? 'success' : 'error'),
    }

    res.send(message);
});

app.post('/test-flow', async (req, res) => {
    let isSucess = true;
    let testedFlow;

    console.log('Flow ID', req.body.id);

    const getById = () => {
        return new Promise<FlowDocument | null>((resolve, reject) => {
            Flow.findById(req.body.id, async (err, flow) => {
                if (err)
                    return reject(err);

                resolve(flow);
            });
        });
    }

    try {
        const flow = await getById();

        const evidence: TestEvidence | any = {
            date: '31/01/2021',
            gmud: 'Teste NOC',
            status: TestEvidenceStatus.Done,
            flows: [<TestFlow>flow],
            title: 'Teste NOC',
            variables: null
        };

        testedFlow = await createEvidencesStandalone(evidence);

        testedFlow.flows.forEach(f => f.tables.forEach(t => t.lines.forEach(l => {
            if (l.result != 'Passou') {
                isSucess = false;
            }
        })));
    } catch (error) {
        isSucess = false;
    }

    const message = {
        videoUrl: testedFlow.flows[0].tables[0].lines[0].videoUrl,
        status: (isSucess ? 'success' : 'error'),
    }

    res.send(message);
});

const server = app.listen(port, () => {
    console.log(`Detective listening on port ${port}`)
})
server.setTimeout(30 * 60 * 1000); // 20 min


const maxProcesses = 2;
let runningProcesses = 0;
async function processEvidences() {
    const canRun = () => maxProcesses > runningProcesses;
    if (canRun()) {
        Evidence.find({ status: TestEvidenceStatus.New }, async (err, evidences) => {
            for await (const evidence of evidences) {
                if (!canRun()) return;

                try {
                    runningProcesses++;
                    evidence.status = TestEvidenceStatus.Processing;
                    await evidence.save();
                    await createEvidences(evidence);
                } catch (error) {
                    const errorLog = {
                        message: error.message,
                        name: error.name,
                        stack: error.stack
                    }
                    console.log('Original Error', error);
                    console.log('Error', errorLog);
                    evidence.status = TestEvidenceStatus.Error;
                    evidence.errorMessages = [errorLog];
                    await removeSensitiveData(evidence);
                    await evidence.save();
                }
                finally {
                    runningProcesses--;
                }
            }
        });
    }
}

setInterval(() => processEvidences(), 1000);

async function createEvidences(request: EvidenceDocument) {
    const files: EvidenceFile[] = new Array();
    const flows = JSON.parse(JSON.stringify(request.flows));
    await removeSensitiveData(request);
    for (let index = 0; index < flows.length; index++) {
        const flow = flows[index];
        files.push({ name: flow.name, path: await createDoc(request, flow, index) })
    }

    request.generated = { date: new Date, files: files };
    request.status = TestEvidenceStatus.Done;
    await request.save();
    await Evidence.findByIdAndUpdate(request._id, { $set: { flows: request.flows } });
}

async function createEvidencesStandalone(evidence: TestEvidence) {
    const files: EvidenceFile[] = new Array();
    const flows = JSON.parse(JSON.stringify(evidence.flows));
    for (let index = 0; index < flows.length; index++) {
        const flow = flows[index];
        files.push({ name: flow.name, path: await createDoc(evidence, flow, index) })
    }

    evidence.generated = { date: new Date, files: files };
    return evidence;
}

async function removeSensitiveData(request: EvidenceDocument) {
    request.flows.forEach(f => f.variables.forEach(v => v.value = (v.isSensitive ? '' : v.value)));
    await Evidence.findByIdAndUpdate(request._id, { $set: { flows: request.flows } });
}

async function createDoc(request: TestEvidence, flow: TestFlow, flowIndex: number) {
    console.log(request);
    const printService = new PrintScreen("temp", false);
    const layout = new LayoutV1();
    const detective = new Detective(collected, layout, printService, false);

    const gmud = request.gmud;
    const date = request.date;

    replaceVariables(flow);

    const tables = flow.tables.map(tb => new TestTable(
        tb.name,
        tb.description,
        [new TestTableHeader("#", 7)].concat(tb.headers.map((v, i) => new TestTableHeader(v, (97 / tb.headers.length)))),
        tb.lines.map(l => new TestTableLine(
            l.description,
            l.texts,
            l.commands.map(x => new TestImageCommand(x.url, x.action))
        ))));

    const dest = path.join(collected, `${getKey(request, flow)}.docx`);
    const job = new TestFlowJob(gmud, date, request.title, tables, dest);

    //UPDATE VIDEO IMAGES HACK
    const testedJob = await detective.collectEvidences(job);
    testedJob.tables.forEach((t, tIndex) => {
        t.lines.forEach((l, lIndex) => {
            console.log(l.videoUrl);
            request.flows[flowIndex].tables[tIndex].lines[lIndex].videoUrl = l.videoUrl;
            request.flows[flowIndex].tables[tIndex].lines[lIndex].result = l.result;
        });
    });

    return dest;
}

function replaceVariables(flow: TestFlow) {
    if (!flow.variables)
        return;

    flow.name = Variable.replace(flow.variables, flow.name);
    flow.tables = <TestTableDto[]>JSON.parse(Variable.replace(flow.variables, JSON.stringify(flow.tables)))
}

function getKey(evidence: TestEvidence, flow: TestFlow) {
    return `${evidence.gmud} ${flow.name.replace(/[\/\\\:]/g, '-')} ${evidence.date.replace(/[\/ \\\:]/g, '-')}`;
}

function createDir(path) {
    console.log("Creating dir " + path);
    fs.mkdir(path, function (err) {
        if (err) {
            if (err.code == 'EEXIST')
                return console.log("Directory already exists, skipping");

            console.log("Error " + err);
            throw err;
        }
    });
}