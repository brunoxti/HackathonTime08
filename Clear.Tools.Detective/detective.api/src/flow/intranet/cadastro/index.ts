import { TestFlowJob, TestTable, TestTableHeader, TestTableLine } from '../../../detective/model/test.model';
import IntranetActions from '../_actions';

export default class Intranet_Cadastro_Flow {
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
                "Cadastro - Gerenciamento de Cadastros",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Gerenciamento de Cadastros", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/registration/Registration/Step2"]
            ),
            new TestTableLine(
                "Cadastro - Bloquear/Desbloquear Usuário",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Bloquear/Desbloquear Usuário", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/registration/AccountManagement"]
            ),
            new TestTableLine(
                "Cadastro - Syncronizar XP",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Syncronizar XP", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/registration/AccountManagement/SyncWithXp"]
            ),
            new TestTableLine(
                "Cadastro - Recadastramento",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Recadastramento", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/registration/UpdateManagement"]
            ),
            new TestTableLine(
                "Cadastro - Novo Recadastramento",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Novo Recadastramento", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/registration/NewUpdateManagement"]
            ),
            new TestTableLine(
                "Cadastro - Ajuste salarial",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Ajuste salarial", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/registration/AccountManagement/WageIncome"]
            ),
            new TestTableLine(
                "Cadastro - Contrato de Intermediação",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Contrato de Intermediação", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/registration/AccountManagement/BrokerageAgreement"]
            ),
            new TestTableLine(
                "Cadastro - Resetar Skips",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Resetar Skips", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/registration/AccountManagement/ResetRetries"]
            ),
            new TestTableLine(
                "Cadastro - Relatórios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Relatórios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/Registration/reports/index?controller=Reports"]
            ),
            new TestTableLine(
                "Cadastro - Ativar Suitability",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Ativar Suitability", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/registration/AccountManagement/ActiveFlagSuitability"]
            ),
            new TestTableLine(
                "Cadastro - Gerenciamento de Bloqueios",
                [
                    { text: "Clear Intranet", isDynamic: false },
                    { text: "Cadastro - Gerenciamento de Bloqueios", isDynamic: false },
                    { text: "Passou", isDynamic: false },
                ],
                ["http://hml.clear.com.br/intranet/NewAccountManagement?module=Registration"]
            ),
        ]);

    prepare() {
        return IntranetActions.login();
    }

    create(gmud, date, destination) {
        return new TestFlowJob(gmud, date, "GMUD - Evidências de Teste Regressivo", [this.table1], destination, this.prepare());
    }
}

