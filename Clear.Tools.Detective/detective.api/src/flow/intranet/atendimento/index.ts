import { TestFlowJob, TestTable, TestTableHeader, TestTableLine } from '../../../detective/model/test.model';
import IntranetActions from '../_actions';

export default class Intranet_Atendimento_Flow {
    private table = new TestTable(
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
                "Atendimento - Encarnar Usuario",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Encarnar Usuario", isDynamic: false },
                    { text: "Passou", isDynamic: false }
                ],
                ["http://hml.clear.com.br/intranet/support/Dashboard"]
            ),
            new TestTableLine(
                "Atendimento - Logs de Atividade",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Logs de Atividade", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/ActivityLogs"]
            ),
            new TestTableLine(
                "Atendimento - Registrar Termo",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Registrar Termo", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/Forward"]
            ),
            new TestTableLine(
                "Atendimento - Emular Cancelamento",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Emular Cancelamento", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/AssetManagement/Cancellation"]
            ),
            new TestTableLine(
                "Atendimento - Carregar Posição",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Carregar Posição", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/AssetManagement/Relocate"]
            ),
            new TestTableLine(
                "Atendimento - Boletagem Simples",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Boletagem Simples", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/AssetManagement/Placement"]
            ),
            new TestTableLine(
                "Atendimento - Limite de Garantia",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Limite de Garantia", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/CreditLimit/Collateral"]
            ),
            new TestTableLine(
                "Atendimento - Zerar Assinatura Eletronica",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Zerar Assinatura Eletronica", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/Signature"]
            ),
            new TestTableLine(
                "Atendimento - Bloquear/Desbloquear Usuário",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Bloquear/Desbloquear Usuário", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/AccountManagement"]
            ),
            new TestTableLine(
                "Atendimento - Vacilos do Robo",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Vacilos do Robo", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/Mistakes/Robot"]
            ),
            new TestTableLine(
                "Atendimento - Overfills",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Overfills", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/Mistakes/Overfills"]
            ),
            new TestTableLine(
                "Atendimento - Gerenciamento de Grupos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Gerenciamento de Grupos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/Groups"]
            ),
            // TODO DEMORADO DEMAIS
            // new TestTableLine(
            //     "Atendimento - Gerenciamento de Policies",
            //     ["Clear Intranet", "Atendimento - Gerenciamento de Policies", "Passou"],
            //     ["http://hml.clear.com.br/intranet/support/Policy"]
            // ),
            new TestTableLine(
                "Atendimento - Mensagens",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Mensagens", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/Messages"]
            ),
            new TestTableLine(
                "Atendimento - Contigência DT",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Contigência DT", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/EmergencyRoom/DayTrade"]
            ),
            new TestTableLine(
                "Atendimento - Visualizar Saldos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Visualizar Saldos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/Balance/Compare"]
            ),
            new TestTableLine(
                "Atendimento - Gerenciar Ativos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Gerenciar Ativos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/AssetManagement"]
            ),
            new TestTableLine(
                "Atendimento - Relatórios de Risco",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Relatórios de Risco", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/RiskControl/DayTrade?order=PnL+asc"]
            ),
            // TODO DEMORADO DEMAIS
            // new TestTableLine(
            //     "Atendimento - Ordens Pendentes à Mercado",
            //     ["Clear Intranet", "Atendimento - Ordens Pendentes à Mercado", "Passou"],
            //     ["http://hml.clear.com.br/intranet/support/Mistakes/PendingMarket?order=CreatedAt+desc"]
            // ),
            new TestTableLine(
                "Atendimento - Exercer Opções",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Exercer Opções", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/ExerciseAsset"]
            ),
            new TestTableLine(
                "Atendimento - Vincular Conta MetaTrader",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Vincular Conta MetaTrader", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/MetaTrader"]
            ),
            new TestTableLine(
                "Atendimento - Relatórios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Relatórios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/Support/reports/index?controller=Reports"]
            ),
            new TestTableLine(
                "Atendimento - Gerenciar garantia em lote",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Gerenciar garantia em lote", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/CollateralBagManagement"]
            ),
            new TestTableLine(
                "Atendimento - Glossário de termos",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Glossário de termos", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/GlossaryEntry"]
            ),
            new TestTableLine(
                "Atendimento - Sugestões para o glossário",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Sugestões para o glossário", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/GlossarySuggestion"]
            ),
            new TestTableLine(
                "Atendimento - Gerenciamento de Bloqueios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Gerenciamento de Bloqueios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/NewAccountManagement?module=Support"]
            ),
            new TestTableLine(
                "Atendimento - Gerenciar Novo AssetGroups",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Gerenciar Novo AssetGroups", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/AssetGroupsNew"]
            ),
            new TestTableLine(
                "Atendimento - Gerenciar BlackList",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Gerenciar BlackList", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/BlackListManagement"]
            ),
            new TestTableLine(
                "Atendimento - Gerenciar Whitelist Clear PRO",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Atendimento - Gerenciar Whitelist Clear PRO", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/support/WhiteListPro?pageNumber=1"]
            ),
        ]);

    private prepare() {
        return IntranetActions.login();
    }

    create(gmud, date, destination) {
        return new TestFlowJob(gmud, date, "GMUD - Evidências de Teste Regressivo", [this.table], destination, this.prepare());
    }
}

