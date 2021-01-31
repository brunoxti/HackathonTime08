using System;
using System.Threading.Tasks;
using Microsoft.AspNet.WebHooks;

namespace WebApiReceiver
{
    public class CustomWebHookHandler : WebHookHandler
    {
        public override Task ExecuteAsync(string receiver, WebHookHandlerContext context)
        {
            var notifications = context.GetDataOrDefault<CustomNotifications>();

            //Received notification with payload
            foreach (var notification in notifications.Notifications)
            {
                Console.WriteLine(string.Join(", ", notification.Values));
            }

            return Task.FromResult(true);
        }
    }
}
