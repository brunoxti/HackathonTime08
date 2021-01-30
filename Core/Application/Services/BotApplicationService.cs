using Core.Application.Contract;
using Core.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Application.Services
{
    public class BotApplicationService : IBotApplicationService
    {
        private readonly string url = $"https://xpcorretora.webhook.office.com/webhookb2/7c23201c-3da5-4751-af1e-5f69bae28368@cf56e405-d2b0-4266-b210-aa04636b6161/IncomingWebhook/5951cf53c13f4f7e82628a40d271350b/129215c7-62d2-4e47-96f8-ae4e4cc88dd0";

        public async Task NotifyAsync(IEnumerable<SyntheticTestResult> enumerable)
        {
            //using (var _client = new HttpClient())
            //{

            //    var content = "Play ja é nosso";
            //    // Perform Connector POST operation     
            //    var httpResponseMessage = await _client.PostAsync(url, new StringContent(content));
            //    // Read response content
            //    var responseContent = await httpResponseMessage.Content.ReadAsStringAsync();
            //    if (responseContent.Contains("Microsoft Teams endpoint returned HTTP error 429"))
            //    {
            //        // initiate retry logic
            //    }
            //}

            Console.WriteLine("=============== End of process, hit any key to finish ===============");
        }
    }
}
