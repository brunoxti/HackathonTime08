# HackathonTime08


### Projeto NocWatcher
<li>Aplicação com IA que fica ouvindo alertas do Zabbix onde quando um alerta é captado, a aplicação através de um treinamento prévio e uma base cheia de testes sintéticos, calcula o rating de cada teste em relação aquele alerta e seleciona o teste mais apropriado para verificar se o alerta é falso.</li>

<li>Cada teste sintético é um teste end-to-end de um fluxo de negócio utilizando puppeteer sendo executado fazendo o papel do cliente final real.</li>

<li>Acessando a aplicação e realizando um fluxo de negócio que passa pelo código onde o alerta foi gerado.</li>

<li>O teste além de ser executado ele é gravado em vídeo.</li>
<li>O alerta é fechado caso os testes provem que o alerta é falso, caso contrário redirecionamos as evidências dos testes e o resultado do teste para a Squad responsável.</li>

## Camadas do Projeto:

### Projeto NocWatcher.Core 

    ├── Application			  # Camada de aplicação
        ├──Service			    # Serviços para execução de fluxo dos testes do com IA
        ├──Contract			    # Contratos (Interface) da aplicação IA
        ├──Dto			    # Contratos de requisição para os testes 	
        ├──IntegrationContracts	    # Contratos (Interfaces) dos serviços de integração(Testes Sintéticos, Zabbix, BotTeams)
   
	├──Domain                         # Camada de Domínio/Models (Contratos Request/Response) IA e Zabbix

    ├── Infrastructure                # Camada de infraestrutura (Integrações)
	    ├──Configuration                # Camada de configuração
	    ├──Context    		    # Contexto de acesso ao banco de dados da aplicação da IA	
	    ├──Map			    # Mapeamentos do banco de dados 
	    ├──Services			    # Serviços de integração com outros serviços (Zabbix, Testes Sintéticos, BotTeams)
   
    ├── Migrations                    # Migrations do banco de dados da IA
    ├── Resources                     # Templates json de testes de integração




### Projeto NocWatcher.ConsoleApp

	├── ConsoleApp                    # ConsoleAplication para rodar a aplicação.




### Projeto WebApiReceiver


	├── WebApiReceiver                # Webapi para endpoint de recebimento de mensagens json.
		├──Controllers		    # Controller de recebimento de notificação do Zabbix
		├──appSettings              # Arquivo de configuração
		├──Program		    # Classe de inicialização da aplicação
		├──Starup		    # Classe para configurar serviços por injeção de dependência.
   
 
<h1>Equipe:</h1>

1. Bruno Alves 
2. Renicius Fostaini 
3. Raquel Lafetá
4. Ivan Lopes
5. Edson Costa 

<h1>Problemas:</h1> 
  <ul>
  <li>VOLUME de  Acionamentos é alto, um total de 100k de alertas, sendo aproximadamente 20% de falsos positivos;</li>
  <li>TEMPO  de retorno sobre a necessidade de verificar o acionamento, dado que é uma verificação humana.</li>
</ul>

<h1>Proposta:</h1> 

Hoje são gerados 100.000 incidentes por mês para serem tratados pela Squad do NOC, área de monitoramento de infraestrutura de TI da XP Inc. Sendo que aproximadamente 20% em média são falsos positivos.

<h1>Solução Técnica:</h1>

1. **A Solução envolve algumas funcionalidades que serão descritas a seguir.**

2. **Criação dos testes Sintéticos.**
	
3. **Treinamento da IA para realizar os testes Sintético**

4. **Integrar a IA com o Teams para envio de Comunicação**

5. **Formalizar pelo Teams  sobre o fechamento de Incidentes Falsos Positivos**

6. **Alertas Verdadeiros serão verificados, já dando feedback de alerta sendo analisado. Lembrando que a IA já realizou os testes na plataforma, facilitando muito a análise humana.**

7. **Formalizar o teste através do vídeo com evidências, enviados junto com a mensagem do Teams.**


<h2>Melhorias Futuras:</h2>

Como trabalhos futuros propomos melhorias pequenas que levam a ferramenta para o patamar de uma ferramenta de monitoria, com os testes sintéticos sendo executados periodicamente para o monitoramento do ambiente de produção. Como este processo de monitoria a solução aqui proposta conseguiria identificar os problemas e até antecipar os alertas.  Os alertas são identificados por sistemas de monitoria, mas as falhas em fluxo de negócio são em muitos casos identificados por clientes finais,  esta solução poderia ser mais rápida do que os clientes, pois não precisaria passar por todo processo de retorno, acionar atendimento, e o atendimento abrir um incidente. Em alguns casos pode inclusive identificar antes do cliente. O Incidente seria aberto pela IA associada ao teste sintético. Os testes sintéticos poderiam identificar problemas que hoje são identificados pelos sistemas atuais de monitoria, mas nestes casos poderia agregar valor com os dados sobre o problema que podem ser coletados durantes os testes, que descrevemos a seguir.  
Outra melhoria possível seria os desenvolvedores receberem feedback rápido a respeito do incidente em produção, através do vídeo com o erro (já retornado hoje pelo MVP), e  com dados sobre os pontos do código afetados pelo problema. Este retorno seria viabilizado pela melhoria que envolve Análise Dinâmica para coleta de partes do código fonte envolvidos no problema, podendo assim agilizar o processo de tratativa dos erros.  

**As seguintes melhorias estão previstas para as próximas versões:**

1. Serviço de monitoria que roda os testes sintéticos a fim de antecipar os incidentes e verificar suas correções futuras;
2. Cadastrar POP de tratamento, que pode ser executado pela IA;
3. Monitorar execução das POPs de tratamento;
4. Formalizar por email o envio destes comunicados;
5. Formalizar pelo Teams  o início da tratativa da falha;
6. Interação com o Taylor para fechamento de incidentes;
7. Interface para criação dos testes;

Esta proposta futura para o fluxo de Acionamentos do NOC funcionaria conforme o fluxo da Figura 1.  **Clique na Figura para visualizar em tamanho original e ampliar.**

![NOC  - Copy Diagram](https://user-images.githubusercontent.com/10197871/106390820-0e095100-63c9-11eb-88c0-a932d585c1d9.png)
Figura 1: Proposta de Futuro Fluxo de Acionamentos do NOC.


<h3>Problemas 2:</h3>

1. TEMPO de Acionamento; 

2. TEMPO de Resposta da Tratativa.  

<h3>Hipótese 2:</h3>  

TESTES SINTÉTICOS podem retornar os erros e abrir incidentes com maior rapidez do que a percepção humana e fluxo de retorno do processo para as inconsistências em produção. A fim de melhorar o TEMPO de resposta e tratar automaticamente vários cenários.  É possível implementar esta solução para monitoria dos sistemas e topologias. 

<h3>Hipótese 3:</h3>

Os testes sintéticos podem  ser utilizados em conjunto com técnicas de engenharia reversa, no caso a Análise Dinâmica dos problemas, coletando rastros que identificam possíveis pontos no código envolvidos com o problema, podendo assim dar um direcionamento ao Desenvolvedor sobre quais pontos merecem atenção na tratativa, podendo tornar o processo de correção mais rápido e assertivo. 

<h3>Hipotese 4:</h3> 

A IA pode ser treinada pra conseguir priorizar os itens mais graves. Hoje a priorização é feita pelo índice P1 e P2 e o  tempo de acionamento. A IA poder executar os testes para  identificar o erro e  seu real impacto e com isso os priorizar melhor, considerando o impacto desta pelo que foi realmente testado e não apenas reportado. 

<h3>Hipotese 5:</h3>

A IA também pode ser treinada para avaliar as relação entre múltiplos incidentes com causa semelhante reportados no mesmo dia, pois ao executar os testes, poderia verificar o mesmo ponto de erro e agrupar os incidentes para serem priorizados devido ao impacto. Facilitando assim o direcionamento da tratativa. 


<h3>Objetivos:</h3>

1. Atuar no fluxo como processo de monitoria de forma à tentar retornar os erros com maior rapidez do que o realizado por humanos. 
2. Fornecer informações importantes sobre os pontos (cenários de teste) em que ocorreram os erros, visando auxiliar na priorização e no direcionamento do trabalho de correção.

<h1>Referências:</h1>

Medium - https://medium.com/revista-tspi/testes-sint%C3%A9ticos-3fd1be96d745.

Hipsters.Tech - Testes sintéticos no C6 Bank - https://hipsters.tech/testes-sinteticos-no-c6-bank-hipsters-on-the-road-40/.

Flávia Falé e Serge Gebhardt - Synthetic Monitoring.

CloudQA - What is Synthetic Testing?.

Freyja Spaven | Raygun - What is Synthetic Testing? A definition and how it compares to Real User Monitoring.

Pingdom - Synthetinc Testing.

PerformanceLab - Synthetinc Testing.

Dynatrace - Synthetic Monitoring.

Sematext - Get Started With Synthetic Monitoring.

Sematext - Real user Monitoring versus Synthetic Monitoring.

SmartBear - What is Synthetic Monitoring.

CatchPoint - The Future of Synthetic Testing is Everything from Everywhere.

Ankush Thakur - 11 Synthetic Monitoring Tools for Your Online Business.

Rigor - 5 Must-Have Features of Top Synthetic Monitoring Tools.
