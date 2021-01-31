using Core.Application.IntegrationContracts;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.Text;

namespace WebApiReceiver.Controllers
{
    [Route("api/webhook")]
    public class WebhookController : Controller
    {
        private readonly IZabbixIntegrationService _service;

        public WebhookController(IZabbixIntegrationService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("")]
        public void Post(string message)
        {
            _service.ReceiveAlert(message);
        }

        [HttpGet]
        [Route("")]
        public HttpResponseMessage Get(string echo)
        {
            var resp = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(echo, Encoding.UTF8, "text/plain")
            };

            return resp;
        }
    }
}