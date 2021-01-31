using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.WebHooks;

namespace WebhookReceiver
{
    public class CustomWebHookHandler : WebHookHandler
    {
        public override Task ExecuteAsync(string receiver, WebHookHandlerContext context)
        {
            var notifications = context.GetDataOrDefault<CustomNotifications>();

            Console.WriteLine($"Received notification with payload:");
            foreach (var notification in notifications.Notifications)
            {
                Console.WriteLine(string.Join(", ", notification.Values));
            }

            return Task.FromResult(true);
        }
    }
}
