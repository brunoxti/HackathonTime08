import Detective from './detective/detective';
import Intranet_Atendimento_Flow from './flow/intranet/atendimento';
import Intranet_Backoffice_Flow from './flow/intranet/backoffice';
import Intranet_Cadastro_Flow from './flow/intranet/cadastro';
import Intranet_Sentimento_Flow from './flow/intranet/sentimento';
import Intranet_Diretoria_Flow from './flow/intranet/diretoria';
import Intranet_PitSettings_Flow from './flow/intranet/pit-settings';
import Intranet_Compliance_Flow from './flow/intranet/compliance';
import Test_Flow from './flow/custom/test';
import IntranetActions from './flow/intranet/_actions';
import Benchmark from './utils/benchmark';
import LayoutV1 from './detective/layout/v1';
import PrintScreen from './browser/print-screen';
import { exit } from 'process';
import fs from 'fs';
import path from 'path';

start()
    .then(() => console.log("Evidences created ;)"))

async function start() {
    const printService = new PrintScreen("temp");
    const layout = new LayoutV1();
    const detective = new Detective(layout, printService, true);

    // HML
    IntranetActions.username = "dev";
    IntranetActions.password = "$r32gsN6H%ov";

    const gmud = 'CHG0053978';
    const date = '17/09/2020 - 11:30';
    const basePath = './';
    const json = path.join(basePath, 'json');
    const collected = path.join(basePath, 'collected');

    createDir(json);
    createDir(collected);

    const duration = await Benchmark.duration(async () => {
        // await detective.collectEvidences(new Intranet_Atendimento_Flow().create(gmud, date, basePath + 'Atendimento.docx'));
        // await detective.collectEvidences(new Intranet_Backoffice_Flow().create(gmud, date, basePath + 'Backoffice.docx'));
        // await detective.collectEvidences(new Intranet_Cadastro_Flow().create(gmud, date, basePath + 'Cadastro.docx'));
        // await detective.collectEvidences(new Intranet_Sentimento_Flow().create(gmud, date, basePath + 'Sentimento.docx'));
        // await detective.collectEvidences(new Intranet_Diretoria_Flow().create(gmud, date, basePath + 'Diretoria.docx'));
        // await detective.collectEvidences(new Intranet_PitSettings_Flow().create(gmud, date, basePath + 'PitSettings.docx'));
        // await detective.collectEvidences(new Intranet_Compliance_Flow().create(gmud, date, basePath + 'Compliance.docx'));
        await detective.collectEvidences(new Test_Flow().create(gmud, date, path.join(collected, 'PitSettings.docx')));
    })
    .catch(err =>  {
        console.log(err);
        exit()
    });

    console.log("All tests completed in " + duration + "ms");
    exit();
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