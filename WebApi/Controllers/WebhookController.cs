using Core.Application.IntegrationContracts;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Core.Application.Contract;

namespace WebApiReceiver.Controllers
{
    [Route("api/webhook")]
    public class WebhookController : Controller
    {
        private readonly ISyntheticTestsApplicationService _service;

        public WebhookController(ISyntheticTestsApplicationService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult> Post([FromBody] object content)
        {
            //await _service.ExecuteAsync(content.ToString());

            return Ok(content);
        }

        [HttpGet]
        [Route("")]
        public HttpResponseMessage Get(string echo)
        {
            echo = "Hackthon";
            var resp = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(echo, Encoding.UTF8, "text/plain")
            };

            return resp;
        }
    }
}