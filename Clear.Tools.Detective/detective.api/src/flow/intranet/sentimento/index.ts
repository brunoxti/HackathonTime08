import { TestFlowJob, TestTable, TestTableHeader, TestTableLine } from '../../../detective/model/test.model';
import IntranetActions from '../_actions';

export default class Intranet_Sentimento_Flow {
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
                "Sentimento - Geral\\Sentimento",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Sentimento - Geral\\Sentimento", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/feeling/General"]
            ),
            new TestTableLine(
                "Sentimento - Trade Ideas\\Swing Trade",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Sentimento - Trade Ideas\\Swing Trade", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/feeling/SwingTrade"]
            ),
            new TestTableLine(
                "Sentimento - Trade Ideas\\Opções",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Sentimento - Trade Ideas\\Opções", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/feeling/OptionStrategy"]
            ),
            // TODO DEmorando 14 minutos pra abrir
            // new TestTableLine(
            //     "Sentimento - BlackBoard",
            //     ["Clear Intranet", "Sentimento - BlackBoard", "Passou"],
            //     ["http://hml.clear.com.br/intranet/feeling/BlackBoard"]
            // ),
            new TestTableLine(
                "Sentimento - Relatórios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Sentimento - Relatórios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/Reports?category=Feeling"]
            ),
        ]);

    prepare() {
        return IntranetActions.login();
    }

    create(gmud, date, destination) {
        return new TestFlowJob(gmud, date, "GMUD - Evidências de Teste Regressivo", [this.table1], destination, this.prepare());
    }
}

