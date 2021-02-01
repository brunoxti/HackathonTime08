using Core.Application.Dto;
using Core.Application.IntegrationContracts;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Reflection;
using System.Text;
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

        public async Task<DetectiveResponseDto> ExecuteSyntheticTest(string testId)
        {
            var uri = new Uri($"http://localhost:3000/test-flow");

            var client = _clientFactory.CreateClient();
            var postData = new List<KeyValuePair<string, string>>();
            postData.Add(new KeyValuePair<string, string>("id", testId));
            var formContent = new FormUrlEncodedContent(postData);

            var response = await client.PostAsync(uri, formContent);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                };

                return JsonSerializer.Deserialize<DetectiveResponseDto>(jsonResponse, options);
            }
            else
                return new DetectiveResponseDto();
        }
    }
}