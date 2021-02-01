import { TestFlowJob, TestTable, TestTableHeader, TestTableLine } from '../../../detective/model/test.model';
import IntranetActions from '../_actions';

export default class Intranet_Diretoria_Flow {
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
                "Pit Settings - Cadastro de Instrumentos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Cadastro de Instrumentos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/InstrumentList"]
            ),
            new TestTableLine(
                "Pit Settings - Cadastro de Composicao",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Cadastro de Composicao", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/InstrumentComposition"]
            ),
            new TestTableLine(
                "Pit Settings - Cadastro de Garantias",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Cadastro de Garantias", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/CollateralAdjustment"]
            ),
            new TestTableLine(
                "Pit Settings - Cadastro de Margens",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Cadastro de Margens", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/MarginCall"]
            ),
            new TestTableLine(
                "Pit Settings - Cadastro de Taxas de Aluguel",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Cadastro de Taxas de Aluguel", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/Btc"]
            ),
            new TestTableLine(
                "Pit Settings - Taxas do Termo",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Taxas do Termo", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/ForwardRate"]
            ),
            new TestTableLine(
                "Pit Settings - Gerenciamento de Corretagem",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Gerenciamento de Corretagem", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/Brokerage"]
            ),
            new TestTableLine(
                "Pit Settings - Gerenciamento de Pacotes",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Gerenciamento de Pacotes", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/Brokerage/Packages"]
            ),
            new TestTableLine(
                "Pit Settings - Gerenciamento de Produtos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Gerenciamento de Produtos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/Tools"]
            ),
            new TestTableLine(
                "Pit Settings - Liga/Desliga Modulo",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Liga/Desliga Modulo", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/ModuleManagement"]
            ),
            new TestTableLine(
                "Pit Settings - BlackBoard",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - BlackBoard", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/BlackBoard"]
            ),
            new TestTableLine(
                "Pit Settings - Compliance",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Compliance", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/Jobs/Patrimonial"]
            ),
            new TestTableLine(
                "Pit Settings - Relatórios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Relatórios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/Settings/reports/index?controller=Reports"]
            ),
            // TODO ERRO
            // new TestTableLine(
            //     "Pit Settings - Jobs",
            //     ["Clear Intranet", "Pit Settings - Jobs", "Passou"],
            //     ["http://hml.clear.com.br/intranet/settings/Jobs"]
            // ),
            new TestTableLine(
                "Pit Settings - Avisos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Avisos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/Warns"]
            ),
            new TestTableLine(
                "Pit Settings - OMS/Cerberus Sessions",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - OMS/Cerberus Sessions", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/OmsTradingSession"]
            ),
            new TestTableLine(
                "Pit Settings - Regras de Roteamento",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Regras de Roteamento", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/RoutingRules"]
            ),
            new TestTableLine(
                "Pit Settings - Agressão MarketPrice",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Agressão MarketPrice", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/MarketPriceManager"]
            ),
            new TestTableLine(
                "Pit Settings - Agressão MarketPrice",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Agressão MarketPrice", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/MarketPriceManager"]
            ),
            new TestTableLine(
                "Pit Settings - Carteiras Recomendadas",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Carteiras Recomendadas", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/SuggestedPortfolio"]
            ),
            new TestTableLine(
                "Pit Settings - Gerenciar Flags",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Pit Settings - Gerenciar Flags", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/settings/Flags"]
            ),
        ]);

    prepare() {
        return IntranetActions.login();
    }

    create(gmud, date, destination) {
        return new TestFlowJob(gmud, date, "GMUD - Evidências de Teste Regressivo", [this.table1], destination, this.prepare());
    }
}

