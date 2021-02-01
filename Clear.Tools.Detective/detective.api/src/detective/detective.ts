import {
    Document,
    Packer,
    AlignmentType
} from 'docx';
import * as fs from 'fs';
import PrintScreen from '../browser/print-screen';
import Benchmark from '../utils/benchmark';
import LayoutV1 from './layout/v1';
import { ImageEvidence } from './model/image-evidence.model';
import { TestFlowJob, TestImageCommand, TestTable } from './model/test.model';
import { v4 as uuidv4 } from 'uuid';
import Parallel from '../utils/parallel'
import puppeteer from 'puppeteer';
import AsyncFunction from '../utils/asyncFunction';
import path from 'path';
import DetectiveError from './exception.model';
import Recorder from '../recorder';

const sizeOf = require('image-size');

export default class Detective {

    constructor(
        private tempFolder: string,
        private layout: LayoutV1,
        private printService: PrintScreen,
        private concurrency: boolean) { }

    private createDocument() {
        const doc = new Document({
            numbering: {
                config: [
                    {
                        reference: "my-order",
                        levels: [
                            {
                                level: 0,
                                format: "decimal",
                                text: "%1.",
                                alignment: AlignmentType.LEFT,
                            },
                        ],
                    },
                ],
            },
        });
        // doc.Header.createParagraph().addRun(new TextRun("Página ").pageNumber()).addRun(new TextRun("de ").numberOfTotalPages());
        return doc;
    }

    public async collectEvidences(backOfficeFlow: TestFlowJob) {
        const gmud = backOfficeFlow.gmud;
        const date = backOfficeFlow.date;
        const title = backOfficeFlow.title;
        const tables = backOfficeFlow.tables;
        const destination = path.resolve(<string>backOfficeFlow.destination);

        const doc = this.createDocument();

        console.log("");
        console.log("Flow " + title);

        if (this.concurrency)
            await this.printImagesConcurrent(tables)
        else
            await this.printImages(tables);

        doc.addSection({
            headers: {
                default: await this.layout.createPageHeader(doc, title, gmud, date),
            },
            children: [
                ...await this.layout.createTableBlock(tables),
                ...await this.layout.createImageBlock(doc, tables)
            ],
        });

        console.log("Generating Document " + backOfficeFlow.title + " path: " + destination)
        const buffer = Packer.toBuffer(doc);

        await buffer.then((buffer) => {
            fs.writeFileSync(destination, buffer);
        });

        backOfficeFlow.tables.forEach((t, tIndex) => t.lines.forEach((l, lIndex) => l.result = tables[tIndex].lines[lIndex].result));

        return backOfficeFlow;
    }

    async printImages(tables: TestTable[]) {
        console.log("Printing images in sequence");

        for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
            const table = tables[tableIndex];
            const context = await this.printService.createBrowserContext();

            for (let evidenceIndex = 0; evidenceIndex < table.lines.length; evidenceIndex++) {
                const evidence = table.lines[evidenceIndex];
                const page = await context.newPage();
                const recorder = new Recorder(page, 30);
                recorder.start();
                for (let commandIndex = 0; commandIndex < evidence.commands.length; commandIndex++) {
                    const command = evidence.commands[commandIndex];
                    const postPrintAction = async (page: puppeteer.Page) => {
                        for (let textIndex = 0; textIndex < evidence.texts.length; textIndex++) {
                            const column = evidence.texts[textIndex];
                            if (!column.isDynamic || column.step != commandIndex) continue;

                            column.text = await this.getCodeResult(column.text, page, table, evidence, command, tableIndex, evidenceIndex, commandIndex, textIndex);
                        }
                    }
                    console.log('Get sequencial image');
                    command.image = await this.createImageEvidence(command, table, evidence, tableIndex, evidenceIndex, commandIndex, page, false, postPrintAction)
                }
                evidence.result = evidence.texts.slice(-1)[0].text;
                const videoUrl = this.tempFolder + '/' + uuidv4() + '.webm';
                evidence.videoUrl = videoUrl;
                await recorder.end(videoUrl);
            }
            context.close();
        }
    }

    async getCodeResult(code, page, table, evidence, command, tableId, evidenceId, commandId, columnId) {
        try {
            return await this.evaluateCode(code, page);
        } catch (error) {
            throw new DetectiveError(`Column Dynamic Value error thrown at
            Table ${tableId + 1}: ${table.name}
            Evidence ${evidenceId + 1}: ${evidence.description}
            Command ${commandId + 1}: ${command.url}
            Column ${columnId}
            Code ${code}
            Error: ${error.message}`);
        }
    }

    async evaluateCode(code, page) {
        // Evaluate inside page content
        const functionBody = `return await page.evaluate(async () => {
            ${code}
        })`;
        const result = await AsyncFunction.create(['page'], code)(page);
        return result;
    }

    async printImagesConcurrent(tables: TestTable[]) {
        console.log("Printing images in concurrency");
        const context = await this.printService.createBrowserContext();
        const actions = tables.reduce((at, table, tableIndex) => {
            return at.concat(table.lines.reduce((a, line, lineIndex) => {
                return a.concat(line.commands.map((command, commandIndex) => {
                    return async () => {
                        const postPrintAction = async (page: puppeteer.Page) => {
                            for (let textIndex = 0; textIndex < line.texts.length; textIndex++) {
                                const column = line.texts[textIndex];
                                if (column.isDynamic && column.step == commandIndex) {
                                    column.text = await this.getCodeResult(column.text, page, table, line, command, tableIndex, lineIndex, commandIndex, textIndex);
                                }
                            }
                        }
                        const page = await context.newPage();
                        const image = await this.createImageEvidence(command, table, line, tableIndex, lineIndex, commandIndex, page, true, postPrintAction);
                        command.image = image;
                    }
                }))
            }, new Array()))
        }, new Array());

        await Parallel.run(actions);
    }

    public async createImageEvidence(command: TestImageCommand, table, evidence, tableId, evidenceId, commandId, page: puppeteer.Page, closePage: boolean, postPrintAction?: Function): Promise<ImageEvidence> {
        try {
            console.log("Starting URL: " + command.url);
            const filename = uuidv4() + '.png';
            const date = new Date();
            let path = '';
            const duration = await Benchmark.duration(async () => path = await this.printService.print(filename, command, page, closePage, postPrintAction));
            console.log("Url: " + command.url + " Image: " + path + " Load time " + duration);
            const imageEvidence = new ImageEvidence(command.url, path, date, duration);
            return imageEvidence
        } catch (error) {
            throw new DetectiveError(`Cannot evaluate code from command
            Table ${tableId + 1}: ${table.name}
            Evidence ${evidenceId + 1}: ${evidence.description}
            Command ${commandId + 1}: ${command.url}
            Code ${command.action}
            Error: ${error.message}`);
        }

    }


    public async getColumnValue(code: string) {
        this.printService
    }
}