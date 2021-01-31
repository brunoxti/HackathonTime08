using Core.Application.IntegrationContracts;
using Core.Domain.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace Core.Infrastructure.Services
{
    public class BotIntegrationService : IBotIntegrationService
    {

        private readonly string url = $"https://xpcorretora.webhook.office.com/webhookb2/7c23201c-3da5-4751-af1e-5f69bae28368@cf56e405-d2b0-4266-b210-aa04636b6161/IncomingWebhook/5951cf53c13f4f7e82628a40d271350b/129215c7-62d2-4e47-96f8-ae4e4cc88dd0";
        private readonly IHttpClientFactory _clientFactory;

        public BotIntegrationService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }


        public async Task NotifyAsync(Result alert, IEnumerable<SyntheticTestResult> enumerable)
        {
            var uri = new Uri(url);

            var client = _clientFactory.CreateClient();

            var content = string.Empty;
            using (StreamReader r = new StreamReader("resources\\teams-message.json"))
            {
                    content = content.Replace("{alert_host}", alert.eventid);
                    content = content.Replace("{alert_description}", alert.name);
                    content = content.Replace("{due_date}", DateTime.Now.ToString());
                    content = content.Replace("{url_video}", "");

                    // Perform Connector POST operation     
                    var httpResponseMessage = await client.PostAsync(url, new StringContent(content));
                    // Read response content
                    var responseContent = await httpResponseMessage.Content.ReadAsStringAsync();
                    if (responseContent.Contains("Microsoft Teams endpoint returned HTTP error 429"))
                    {
                        // initiate retry logic
                    }
                
                content = r.ReadToEnd();
            }

            content = content.Replace("{alert_host}", alert.opdata);
            content = content.Replace("{alert_description}", alert.name);
            content = content.Replace("{due_date}", DateTime.Now.ToString());
            content = content.Replace("{url_video}", "");

            var response = await client.PostAsync(uri, new StringContent(content));

            if (response.IsSuccessStatusCode)
            {
                var contents = await response.Content.ReadAsStringAsync();
            }
        }
    }
}