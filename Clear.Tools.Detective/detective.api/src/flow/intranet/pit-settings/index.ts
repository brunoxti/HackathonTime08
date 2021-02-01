import { TestFlowJob, TestTable, TestTableHeader, TestTableLine } from '../../../detective/model/test.model';
import IntranetActions from '../_actions';

export default class Intranet_PitSettings_Flow {
    table1 = new TestTable(
        "Lista dos cenários de testes",
        "Testes no Serviço",
        [
            new TestTableHeader("#", 7),
            new TestTableHeader("Sistema", 32),
            new TestTableHeader("Cenário", 32,),
            new TestTableHeader("Status do Teste", 33),
        ],
        [
            new TestTableLine(
                "Diretoria - Relatórios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Diretoria - Relatórios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/Board/reports/index?controller=Reports"]
            ),
            new TestTableLine(
                "Diretoria - Alterar Como Conheceu",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Diretoria - Alterar Como Conheceu", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/board/HowKnow"]
            ),
            new TestTableLine(
                "Diretoria - Recadastramento",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Diretoria - Recadastramento", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/board/UpdateConfirmation"]
            ),
        ]);

    prepare() {
        return IntranetActions.login();
    }

    create(gmud, date, destination) {
        return new TestFlowJob(gmud, date, "GMUD - Evidências de Teste Regressivo", [this.table1], destination, this.prepare());
    }
}

