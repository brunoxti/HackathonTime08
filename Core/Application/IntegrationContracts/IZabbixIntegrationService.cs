using System.Threading.Tasks;

namespace Core.Application.IntegrationContracts
{
    public interface IZabbixIntegrationService
    {
        Task AckAlert(string eventid, string subscriptionKey);

        Task GetAlert(string eventid, string subscriptionKey);

        Task ReceiveAlert(string nocAlert);


        Task WorkerAlert(string nocAlert);
    }
}