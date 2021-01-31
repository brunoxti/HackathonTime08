# HackathonTime08
# Markdown

<h1>Título:</h1> Uma solução para detecção e tratativa de problemas em produção focada na perspectiva do cliente final

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
Figura 01:  Exemplo de mensagem enviada para o Teams diante a ocorrência de um falso positivo. 

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

   OBS: Alertas Verdadeiros serão verificados, mas não serão respondidos, inicialmente.

6. **Formalizar o teste através do vídeo com evidência, enviados junto com a mensagem do Teams.**




