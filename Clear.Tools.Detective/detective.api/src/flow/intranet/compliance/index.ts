import { TestFlowJob, TestTable, TestTableHeader, TestTableLine } from '../../../detective/model/test.model';
import IntranetActions from '../_actions';

export default class Intranet_Compliance_Flow {
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
                "Compliance - Relatórios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Compliance - Relatórios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/Compliance/reports/index?controller=Reports"]
            ),
        ]);

    prepare() {
        return IntranetActions.login();
    }

    create(gmud, date, destination) {
        return new TestFlowJob(gmud, date, "GMUD - Evidências de Teste Regressivo", [this.table1], destination, this.prepare());
    }
}

