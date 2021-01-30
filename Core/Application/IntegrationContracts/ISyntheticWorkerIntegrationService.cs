using Core.Domain.Models;
using System.Threading.Tasks;

namespace Core.Application.IntegrationContracts
{
    public interface ISyntheticWorkerIntegrationService
    {
        Task<SyntheticTestResult> StartSyntheticTest(string name);
    }
}
