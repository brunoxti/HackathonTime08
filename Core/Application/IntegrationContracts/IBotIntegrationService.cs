using Core.Domain.Models;
using System.Threading.Tasks;

namespace Core.Application.IntegrationContracts
{
    public interface IBotIntegrationService
    {
        Task NotifyFalsePositiveAsync(Result alert, SyntheticTest test, string videoUrl);
        Task NotifySyntheticTestFailed(Result alert, SyntheticTest test, string videoUrl);
    }
}
