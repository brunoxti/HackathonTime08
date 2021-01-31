using Core.Application.IntegrationContracts;
using System;
using System.Net.Http;
using System.Text.Json;
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

            var bodyParameters = string.Empty;
            var response = await client.PostAsync(uri, new StringContent(bodyParameters));

            if (response.IsSuccessStatusCode)
            {
                var contents = await response.Content.ReadAsStringAsync();
            }
        }
    }
}
