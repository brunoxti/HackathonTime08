import { TestFlowJob, TestTable, TestTableHeader, TestTableLine } from '../../../detective/model/test.model';
import IntranetActions from '../_actions';

export default class Intranet_Backoffice_Flow {
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
                "Backoffice - Liquidar Termo",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Liquidar Termo", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Forward"]
            ),
            new TestTableLine(
                "Backoffice - Sincronizar Aluguel",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Sincronizar Aluguel", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Btc/Synch"]
            ),
            // TODO ERRO System.OutOfMemory
            // new TestTableLine(
            //     "Backoffice - Conciliar Posição",
            //     ["Clear Intranet", "Backoffice - Conciliar Posição", "Passou"],
            //     ["http://hml.clear.com.br/intranet/backoffice/Safekeeping/Conciliation"]
            // ),
            // TODO ERRO System.OutOfMemory
            // new TestTableLine(
            //     "Backoffice - Conciliação Financeira",
            //     ["Clear Intranet", "Backoffice - Conciliação Financeira", "Passou"],
            //     ["http://hml.clear.com.br/intranet/backoffice/Balance/FinanceSummary"]
            // ),
            new TestTableLine(
                "Backoffice - Importar Saldos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Importar Saldos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Balance/Pull"]
            ),
            new TestTableLine(
                "Backoffice - Importar Saldos [Novo - BETA]",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Importar Saldos [Novo - BETA]", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Balance/PullNew"]
            ),
            new TestTableLine(
                "Backoffice - Importar Custos Operacionais",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Importar Custos Operacionais", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Balance/DailyFinanceSummary"]
            ),
            new TestTableLine(
                "Backoffice - Corretagem",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Corretagem", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Brokerage"]
            ),
            new TestTableLine(
                "Backoffice - Pagamentos & Cobranças",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Pagamentos & Cobranças", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Balance/DoPayment"]
            ),
            new TestTableLine(
                "Backoffice - Créditos Pit/Sinacor",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Créditos Pit/Sinacor", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Balance/Credits"]
            ),
            new TestTableLine(
                "Backoffice - Importação de cobrança",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Importação de cobrança", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Balance/ImportCollection"]
            ),
            new TestTableLine(
                "Backoffice - Gerenciar Ativos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Gerenciar Ativos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/AssetManagement"]
            ),
            new TestTableLine(
                "Backoffice - Expirar Ativos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Expirar Ativos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/AssetManagement/Expire"]
            ),
            new TestTableLine(
                "Backoffice - Evts. Corporativos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Evts. Corporativos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/AssetManagement/Event"]
            ),
            new TestTableLine(
                "Backoffice - Gerenciar Saldo",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Gerenciar Saldo", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Balance/Edit"]
            ),
            new TestTableLine(
                "Backoffice - Visualizar Saldos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Visualizar Saldos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Balance/Compare"]
            ),
            new TestTableLine(
                "Backoffice - Retiradas",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Retiradas", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Balance/PendingWithdraws?status=Pending&code=&start=16%2f09%2f2020+00%3a00%3a00&end=17%2f09%2f2020+00%3a00%3a00"]
            ),
            // new TestTableLine(
            //     "Backoffice - Cobrar Tx. Cust./Manut.",
            //     ["Clear Intranet", "Backoffice - Cobrar Tx. Cust./Manut.", "Passou"],
            //     ["http://hml.clear.com.br/intranet/backoffice/Balance/MaintenanceTax"]
            // ),
            new TestTableLine(
                "Backoffice - Limite de Garantia",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Limite de Garantia", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/CreditLimit/Collateral"]
            ),
            new TestTableLine(
                "Backoffice - Limite de Crédito/CM",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Limite de Crédito/CM", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/CreditLimit/ManageLimits"]
            ),
            new TestTableLine(
                "Backoffice - Cadastro IPO",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Cadastro IPO", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Safekeeping/NewIpo"]
            ),
            new TestTableLine(
                "Backoffice - Gerenciar IPO",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Gerenciar IPO", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/IPO"]
            ),
            new TestTableLine(
                "Backoffice - Boletagem Simples",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Boletagem Simples", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/AssetManagement/Placement"]
            ),
            new TestTableLine(
                "Backoffice - Encarnar Usuário",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Encarnar Usuário", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Incarnation"]
            ),
            new TestTableLine(
                "Backoffice - Logs de Atividade",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Logs de Atividade", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/ActivityLogs"]
            ),
            new TestTableLine(
                "Backoffice - Mensagens",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Mensagens", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Messages"]
            ),
            new TestTableLine(
                "Backoffice - Gerenciador de Instrumentos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Gerenciador de Instrumentos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/Instrument"]
            ),
            new TestTableLine(
                "Backoffice - Renda Fixa",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Renda Fixa", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/FixedIncome"]
            ),
            new TestTableLine(
                "Backoffice - Fundos de Investimento",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Fundos de Investimento", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/backoffice/InvestmentFund"]
            ),
            new TestTableLine(
                "Backoffice - Relatórios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Backoffice - Relatórios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/Backoffice/reports/index?controller=Reports"]
            ),
        ]);

    prepare() {
        return IntranetActions.login();
    }

    create(gmud, date, destination) {
        return new TestFlowJob(gmud, date, "GMUD - Evidências de Teste Regressivo", [this.table1], destination, this.prepare());
    }
}

