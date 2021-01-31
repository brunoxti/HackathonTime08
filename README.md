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

O treinamento prévio da IA para este MVP foi implementado utilizando um arquivo .csv, contendo um rating de 0 À 100, relativo à efetividade de um teste sintético para verificar este alerta e o teste sintético. A IA será treinada com a simulação dos principais problemas, constantemente. Em casos onde a taxa de efetividade desta for abaixo de 90%, a IA irá executar todos os testes sintéticos para encontrar uma relação com o alerta e melhorar a taxa, em um processo de retreinamento. A Figura 3 apresenta um exemplo do arquivo de treinamento. 

![image001](https://user-images.githubusercontent.com/10197871/106390059-5de61900-63c5-11eb-845a-93f754f7323e.jpg)
Figura 01:  Exemplo de mensagem enviada para o Teams diante a ocorrência de um falso positivo. 

Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature
Figura 2: Exemplo de alerta para o fluxo da assinatura eletrônica.


Figura 3: Exemplo do arquivo de treinamento.

