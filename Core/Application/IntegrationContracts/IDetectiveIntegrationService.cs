using System;
using System.Threading.Tasks;

namespace Core.Application.IntegrationContracts
{
    public interface IDetectiveIntegrationService
    {
        Task ExecuteSyntheticTest(Guid testId);
    }
}
