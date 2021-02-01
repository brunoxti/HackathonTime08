using Core.Application.IntegrationContracts;
using Core.Domain.Models;
using Core.Domain.Models.ZabbixApi.Request;
using Core.Domain.Models.ZabbixApi.Response;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Services
{
    public class ZabbixIntegrationService : IZabbixIntegrationService
    {
        private readonly IConfiguration _configuration;
        private readonly string _baseUrl = "https://opti.xpinc.io/zabbix-hml/api_jsonrpc.php";

        private List<string> ListAlertActive { get; set; }

        public ZabbixIntegrationService(IConfiguration configuration)
        {
            _configuration = configuration;
            ListAlertActive = new List<string>();
        }

        public async Task GetAlert(string eventid, string token)
        {
            Console.WriteLine("=============== Geting alerts ===============");
            try
            {
                using (var _client = new HttpClient())
                {
                    if (token != null)
                    {
                        var eventRequest = BuildGetEventRequest(eventid, token);
                        var content = new StringContent(JsonConvert.SerializeObject(eventRequest), Encoding.UTF8, "application/json");
                        var httpResponseMessage = await _client.PostAsync(_baseUrl, content);
                        var responseContent = await httpResponseMessage.Content.ReadAsStringAsync();

                        var result = JsonConvert.DeserializeObject<EventResponse>(responseContent);

                        if (result.result.Count > 0)
                        {
                            foreach (var alert in result.result)
                            {
                                if (ListAlertActive.Contains(alert.eventid))
                                {
                                    break;
                                }

                                ListAlertActive.Add(alert.eventid);

                                Console.WriteLine("=============== Alerts is Running Eventid {0}  ===============", alert.eventid);
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {

            }
            Console.WriteLine("=============== End of process, get alerts. ===============");
        }

        public async Task AckAlert(string eventid, string token)
        {
            Console.WriteLine("=============== Starting Acknowledge alerts ===============");
            try
            {
                using (var _client = new HttpClient())
                {
                    if (token != null)
                    {
                        var eventRequest = BuildAckEventRequest(eventid, token);
                        var content = new StringContent(JsonConvert.SerializeObject(eventRequest), Encoding.UTF8, "application/json");
                        var httpResponseMessage = await _client.PostAsync(_baseUrl, content);
                        var responseContent = await httpResponseMessage.Content.ReadAsStringAsync();

                        var result = JsonConvert.DeserializeObject<AckResponse>(responseContent);

                        if (result.result.eventids.Count > 0)
                        {
                            foreach (var ackEventId in result.result.eventids)
                            {
                                Console.WriteLine("=============== Acknowledge ok in eventid {0}  ===============", ackEventId);
                                
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {

            }

            Console.WriteLine("=============== End of process Acknowledge Success ===============");
        }

        public async Task CloseAlert(string eventid, string token)
        {
            Console.WriteLine("=============== Starting closing alert on Zabbix  ===============");

            try
            {
                using (var _client = new HttpClient())
                {
                    if (token != null)
                    {
                        var eventRequest = BuildCloseEventRequest(eventid, token);
                        var content = new StringContent(JsonConvert.SerializeObject(eventRequest), Encoding.UTF8, "application/json");
                        var httpResponseMessage = await _client.PostAsync(_baseUrl, content);
                        var responseContent = await httpResponseMessage.Content.ReadAsStringAsync();

                        var result = JsonConvert.DeserializeObject<AckResponse>(responseContent);

                        if (result.result.eventids.Count > 0)
                        {
                            foreach (var ackEventId in result.result.eventids)
                            {
                                Console.WriteLine("=============== Closing alert on Zabbix ok eventId {0}  ===============", ackEventId);
                                Console.WriteLine("=============== Removing alerts from list. eventId {0}  ===============", ackEventId);
                                ListAlertActive.Remove(ackEventId.ToString());
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {

            }

            Console.WriteLine("=============== End of process close alert ===============");
        }

        public Task ReceiveAlert(string alertjson)
        {
            var results = JsonConvert.DeserializeObject<NocAlert>(alertjson);

            foreach (var evertId in results.result)
            {
                ListAlertActive.Add(evertId.eventid);
                Console.WriteLine("=============== Receiving alerts {0} ===============", evertId);
            }

            Console.WriteLine("=============== Receive alerts Complete===============");

            Task.FromResult(WorkerAlert(results.result[0].eventid));

            return Task.CompletedTask;
        }

        public async Task WorkerAlert(string eventid)
        {
            try
            {
                var token = await Authenticate();
                await GetAlert(eventid, token);
                await AckAlert(eventid, token);
                await CloseAlert(eventid, token);
            }
            catch (Exception e)
            {

            }

            Console.WriteLine("=============== End of process WorkerAlert EventId {0}===============", eventid);
        }

        private DefaultRequest BuildAckEventRequest(string eventids, string subscriptionKey)
        {
            var request = new DefaultRequest()
            {
                method = EventRequest.acknowledge,
                @params = new
                {
                    eventids = eventids,
                    action = 6,
                    message = "Alerta recebido. Time 08 hackthon analisando!."
                },
                auth = subscriptionKey
            };
            return request;
        }

        private DefaultRequest BuildCloseEventRequest(string eventids, string subscriptionKey)
        {
            var request = new DefaultRequest()
            {
                method = EventRequest.acknowledge,
                @params = new
                {
                    eventids = eventids,
                    action = 1,
                    message = "Problem resolved by Time 08 Hackathon! :)"
                },
                auth = subscriptionKey
            };
            return request;
        }

        public async Task<string> Authenticate()
        {
            try
            {
                using (var _client = new HttpClient())
                {
                    var request = RequestLogin();

                    var content = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
                    var httpResponseMessage = await _client.PostAsync(_baseUrl, content);
                    var responseContent = await httpResponseMessage.Content.ReadAsStringAsync();

                    var result = JsonConvert.DeserializeObject<Response>(responseContent);

                    if (result.result != null)
                    {
                        Console.WriteLine("=============== LoginSuccess ===============");
                        return result.result;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("=============== LoginFailed ===============");
            }

            return string.Empty;
        }

        private DefaultRequest RequestLogin()
        {
            var request = new DefaultRequest()
            {
                method = LoginRequest.login,
                @params = new
                {
                    user = "UXXXXX",
                    password = "********",
                }
            };
            return request;
        }

        private DefaultRequest BuildGetEventRequest(string eventids, string subscriptionKey)
        {
            var request = new DefaultRequest()
            {
                method = EventRequest.get,
                @params = new
                {
                    eventids = eventids,
                },
                auth = subscriptionKey
            };
            return request;
        }
    }
}
