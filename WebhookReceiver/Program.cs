using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Owin.Hosting;

namespace WebhookReceiver
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var webhookReceiverBaseAddress = "http://localhost:9001/";
            var webhookSenderBaseAddress = "http://localhost:9002";

            var handler = new HttpClientHandler
            {
                UseDefaultCredentials = true
            };

            // Start OWIN host 
            using (WebApp.Start<Startup>(webhookReceiverBaseAddress))
            using (var httpClient = new HttpClient(handler))
            {
                // User should wait until the server (WebApiHost) is up and running before registering
                Console.WriteLine("Webhook receiver running");
                Console.WriteLine("Wait for the server to be ready. Then press any key to register this client on the webhook sender");
                Console.ReadKey();

                // Create a webhook registration to our custom controller
              

                //// Register our webhook using the custom controller
                //var result = await httpClient.PostAsJsonAsync($"{webhookSenderBaseAddress}/api/webhooks/registrations", registration);
                //Console.WriteLine(result.IsSuccessStatusCode ? "Registration succesful" : "Registration failed");

                // Create a webhook registration to the build in webhook controller
               

                // Register our webhook using the build in WebHookHandler
                //result = await httpClient.PostAsJsonAsync($"{webhookSenderBaseAddress}/api/webhooks/registrations", registration);
                //Console.WriteLine(result.IsSuccessStatusCode ? "Registration succesful" : "Registration failed");

                Console.WriteLine("Press 'm' to send a message");
                Console.WriteLine("Press 'r' to remove a message");
                Console.ReadKey();

                ConsoleKey key;


            }
        }
    }
}
