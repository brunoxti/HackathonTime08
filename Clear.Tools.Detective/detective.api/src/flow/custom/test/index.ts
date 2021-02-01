import { TestFlowJob, TestTable, TestTableHeader, TestTableLine } from '../../../detective/model/test.model';

export default class Test_Flow {
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
                "Test - Relatórios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Diretoria - Relatórios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://google.com"]
            ),
        ]);

    prepare() {
        return () => {};
    }

    create(gmud, date, destination) {
        return new TestFlowJob(gmud, date, "GMUD - Evidências de Teste Regressivo", [this.table1], destination, this.prepare());
    }
}

