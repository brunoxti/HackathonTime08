using Microsoft.AspNet.WebHooks;
using System;
using System.Threading.Tasks;

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
