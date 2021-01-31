using Core.Application.IntegrationContracts;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Core.Infrastructure.Services
{
    public class DetectiveIntegrationService : IDetectiveIntegrationService
    {
        private readonly IHttpClientFactory _clientFactory;

        public DetectiveIntegrationService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task ExecuteSyntheticTest()
        {
            var uri = new Uri($"http://localhost:3000/test");

            var client = _clientFactory.CreateClient();

            JObject data = JObject.Parse(File.ReadAllText(Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"JsonDetectiveRequest.json")));
            var response = await client.PostAsync(uri, new StringContent(data.ToString(), Encoding.UTF8, "application/json"));

            if (response.IsSuccessStatusCode)
            {
                var contents = await response.Content.ReadAsStringAsync();
            }
        }
    }
}