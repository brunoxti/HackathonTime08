using Core.Domain.Models;
using System.Threading.Tasks;

namespace Core.Application.IntegrationContracts
{
    public interface IZabbixIntegrationService
    {
        Task AckAlert(NocAlert nocAlert);
    }
}