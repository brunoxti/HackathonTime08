# HackathonTime08


<h1>Título: Uma solução para detecção e tratativa de problemas em produção focada na perspectiva do cliente final</h1>

<h1>Equipe:</h1>

1. Bruno Alves 
2. Reinicius Fostaini 
3. Raquel Lafetá
4. Ivan Lopes
5. Edson Costa 


<h1>Proposta:</h1> 

Hoje são gerados 100.000 incidentes por mês para serem tratados pela Squad do NOC, área de monitoramento de infraestrutura de TI da XP Inc. Sendo que aproximadamente 20% em média são falsos positivos.

<h2>Problema:</h2> 
  <ul>
  <li>VOLUME de  Acionamentos é alto, um total de 100k de alertas, sendo aproximadamente 20% de falsos positivos;</li>
  <li>TEMPO  de retorno sobre a necessidade de verificar o acionamento, dado que é uma verificação humana.</li>
</ul>

Diante deste problema, neste documento,  propomos uma solução para detecção de erros em produção que utiliza de automação de testes de front-end através do uso de testes sintéticos, esta utiliza chromium e simula um usuário real. Os testes sintéticos, também chamados de “monitoramento sintético”, são basicamente a execução de scripts automatizados em produção, os quais simulam transações de usuários naquele ambiente. Além disso, alguns alertas podem ser criados, caso ocorra alguma situação fora do normal ocorra. Com o alerta disparado, a equipe responsável por aquele módulo poderia ser acionada e já tomar alguma providência para entender e resolver a indisponibilidade. Nesse cenário, o tempo de reparo ou fechamento do incidente pode ser menor, se comparado a um humano. Os testes sintéticos são um agregador de valor ao monitoramento de usuários reais, pois com os dados obtidos em ambas as abordagens, é possível ter uma visão mais ampla do que está acontecendo no ambiente de produção.  Além disso, eles apresentam alguns benefícios: i) Coleta de dados reais; ii) Feedback rápido para os times; iii) Foco do teste em monitoria, garantindo a informação de que algo quebrou em produção; iv) Antecipação de inconsistências; e,  v) Medição de dados de infraestrutura, otimizando o escalonamento de servidores.

Vários tipos de scripts podem ser criados, em diferentes camadas da aplicação. Acreditamos que esta solução funcionaria bem para problemas do tipo: validar disponibilidade; validar fluxo de negócio com problemas; problemas de disponibilidade em banco de dados; validar consistência de dados; validar tempos de resposta, etc. Em resumo, tudo que possa ser verificado em testes “end-to-end”  que impactam diretamente o cliente final. Serão verificadas as perspectivas do cliente final. Todo o contexto de uso é controlado, ou seja, as ações executadas são predefinidas e executadas proativamente. 

Para a solução que aqui propomos, pretendemos executar os testes para os incidentes com cobertura destes testes, e com isso verificar se realmente estes incidentes/alertas são verdadeiros, para neste processo identificar os falsos positivos. Pretendemos inicialmente tratar o problema dos falsos positivos neste MVP, e para isso a IA tem a função de avisar sobre os incidentes falsos positivos  no Microsoft Teams  (ferramenta de comunicação da empresa) para o fechamento deste. Optamos por utilizar uma IA, pois esta pode ser treinada para escolher os testes que possuem maior relação com o incidente e priorizar a execução destes testes, tornando assim o retorno mais rápido sobre este incidentes realmente ter ocorrido A IA fica “ouvindo” alertas do Zabbix, e quando um alerta aparece, ela através de um treinamento prévio* e uma base com os testes sintéticos calcula o rating de cada teste em relação aquele alerta e seleciona os 3 testes mais apropriados em paralelo para verificar se o alerta é falso, cada teste sintético é um teste end-to-end de um fluxo de negócio utilizando puppeteer** (tecnologia utilizada para realizar os testes sintéticos) ou seja é como se fosse um cliente real, acessando a aplicação e realizando um fluxo de negócio que passa pelo código onde o alerta está acusando. O teste além de ser executado ele é gravado em vídeo e enviado no Teams como evidência. Caso os testes funcionem com sucesso o alerta é considerado falso positivo, ele é eliminado através de um Ack no Zaabix e também uma mensagem é enviada via chat bot do Teams, junto com o vídeo. A Figura 01, apresenta um exemplo de mensagem enviada para o Teams sobre a ocorrência de um incidente falso positivo. Segue exemplo na Figura 02, que apresenta o alerta referente à verificação da funcionalidade de assinatura eletrônica do cliente. Esta assinatura é solicitada em vários fluxos.  

O treinamento prévio da IA para este MVP foi implementado utilizando um arquivo .csv, contendo um rating de 0 À 100, relativo à efetividade de um teste sintético para verificar este alerta e o teste sintético. A IA será treinada com a simulação dos principais problemas, constantemente. Em casos onde a taxa de efetividade desta for abaixo de 90%, a IA irá executar todos os testes sintéticos para encontrar uma relação com o alerta e melhorar a taxa, em um processo de retreinamento. A Figura 2 apresenta um exemplo do arquivo de treinamento.  


Segue um exemplo de alerta para o fluxo da assinatura eletrônica: 
**Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature**

![image001](https://user-images.githubusercontent.com/10197871/106390059-5de61900-63c5-11eb-845a-93f754f7323e.jpg)
Figura 1:  Exemplo de mensagem enviada para o Teams diante a ocorrência de um falso positivo. 

![image002](https://user-images.githubusercontent.com/10197871/106390194-f67c9900-63c5-11eb-841e-58932dce68bd.jpg)
Figura 2: Exemplo do arquivo de treinamento.


Seguem alguns pontos a serem considerados para adoção da abordagem. Os testes sintéticos podem trazer informações valiosas se implementados corretamente, paralelos à monitoração real dos usuários da aplicação. Entretanto, antes de utilizar esta abordagem, é importante verificar se o processo de testes está maduro o suficiente para suportá-la, a exemplo de testes automatizados já serem implementados e gerenciados satisfatoriamente em ambientes pré-produção. Além do mais, é importante mapear os riscos de implementação, custos computacionais e definir quais métricas serão escolhidas para realizar o monitoramento. Essas informações são insumos para definir os possíveis alertas que serão disparados quando alguma inconsistência for identificada pelos testes.
       
Acreditamos que o uso desta solução, se efetiva, minimizaria o problema da volumetria em aproximadamente 20%. É claro que esta redução depende da cobertura dos testes sintéticos implementada.  Mas, se efetivo, poderá impactar no volume de verificações realizadas por analistas em horas, volume de trabalho e no tempo de resposta.  Os incidentes que são verdadeiros, não serão tratados neste MVP. Quando o incidente é falso positivo, ele continua aberto e será tratado pelo time.  Porém falamos sobre estes nos trabalhos futuros, possível evolução deste MVP.  

Não será necessário a compra de novas ferramentas de mercado. A IA utilizada é uma ferramenta terceira da Machine Learning Microsoft (para .NET), porém sem custo adicional.  Será necessário o investimento na evolução da solução MVP apresentada. O investimento varia conforme a cobertura dos testes. O mesmo teste sintético pode servir para a mesma funcionalidade em vários pontos distintos do sistema em análise. Uma funcionalidade do sistema pode ser coberta por vários testes distintos, sendo uma relação de muitos para muitos, assim como na análise da cobertura de testes.  A cobertura destes testes pode ser algo associado aos objetivos de melhoria na Qualidade de Desenvolvimento, uma vez que pode seguir alinhado à automação dos testes. É possível aproveitar os testes automatizados para realizar os testes sintéticos. A possível diminuição das interações humanas, com um menor volume de horas trabalhadas verificando os acionamentos do NOC,  pode ser considerado uma boa contra partida para o investimento necessário. Hoje uma equipe terceira realiza tratativa sobre estes itens falsos positivos, porém leva em média 2 dias para verificar e tratar os falsos positivos.   O investimento em testes sintéticos pode trazer uma evolução também no sentido da qualidade de desenvolvimento de sistemas para as Squads da área de Tecnologia da Empresa.

Este MVP abre caminho para avaliar o uso dos testes sintéticos para analise de problemas em Produção. Este viabilizou a analise de viabilidade de abordagens mais completas do que este MVP que acreditamos serem viáveis, efetivas e podem melhorar o monitoramento e tratativa dos problemas em Produção. Estas propostas de evolução são apresentadas nos trabalhos futuros apresentados a seguir.

<h2>Hipótese 1:</h2>  
**Nossa hipótese para o MVP é:**
O uso de testes sintéticos pode verificar inconsistências em produção e seria importante para diminuir o VOLUME de incidentes/alertas falsos positivos abertos ao realizar uma verificação da ocorrência através de uma IA. 

A IA dispara automaticamente este teste sintético, eliminando a interação humana e diminuindo a carga de trabalho e TEMPO de resposta aos Incidentes. Pois caso seja um alerta falso, a IA fecharia estes incidentes acarretando menos incidentes abertos e zero interações humanas sobre os incidentes falsos positivos cobertos pelos testes sintéticos.

<h2>Objetivos:</h2>

**O principal objetivo do MVP é:**
 	Diminuir o volume de alertas abertos através da verificação realizada pela IA, eliminando os alertas Falsos Negativos. 
	
**O objetivo secundário do MVP é:**
	Validar o uso de testes sintéticos pensando em trabalhos futuros, evolução do MVP, que pode ter uma cobertura mais abrangente e tratar muitos outros problemas segundo hipóteses apresentadas nos trabalhos futuros. 
	
<h2>Solução Técnica:</h2>

1. **A Solução envolve algumas funcionalidades que serão descritas a seguir.**

2. **Criação dos testes Sintéticos.**
	
3. **Treinamento da IA para realizar os testes Sintético**

4. **Integrar a IA com o Teams para envio de Comunicação**

5. **Formalizar pelo Teams  sobre o fechamento de Incidentes Falsos Positivos**

   OBS: Alertas Verdadeiros serão verificados, mas não serão respondidos, inicialmente. Lembrando que a IA já realizou os testes na plataforma, facilitando muito a análise humana.

6. **Formalizar o teste através do vídeo com evidências, enviados junto com a mensagem do Teams.**


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

Esta proposta futura para o fluxo de Acionamentos do NOC funcionaria conforme o fluxo da Figura 3.  **Clique na Figura para visualizar em tamanho original e ampliar.**

![NOC  - Copy Diagram](https://user-images.githubusercontent.com/10197871/106390820-0e095100-63c9-11eb-88c0-a932d585c1d9.png)
Figura 3: Proposta de Futuro Fluxo de Acionamentos do NOC.


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

Hipsters.Tech - Testes sintéticos no C6 Bank.

Flávia Falé e Serge Gebhardt - Synthetic Monitoring.

CloudQA - What is Synthetic Testing?.

Freyja |Raygun - What is Synthetic Testing? A definition and how it compares to Real User Monitoring.

Pingdom - Synthetinc Testing.

PerformanceLab - Synthetinc Testing.

Dynatrace - Synthetic Monitoring.

Sematext - Get Started With Synthetic Monitoring.

Sematext - Real user Monitoring versus Synthetic Monitoring.

SmartBear - What is Synthetic Monitoring.

CatchPoint - The Future of Synthetic Testing is Everything from Everywhere.

Ankush Thakur - 11 Synthetic Monitoring Tools for Your Online Business.

Rigor - 5 Must-Have Features of Top Synthetic Monitoring Tools.
