using Core.Domain.Models;
using System.Threading.Tasks;

namespace Core.Application.Contract
{
    public interface IZabbixIntegratorApplicationService
    {
        Task AckAlert(NocAlert nocAlert);
    }
}