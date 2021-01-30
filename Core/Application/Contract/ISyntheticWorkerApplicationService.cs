using Core.Domain.Models;
using System.Threading.Tasks;

namespace Core.Application.Contract
{
    public interface ISyntheticWorkerApplicationService
    {
        Task<SyntheticTestResult> StartSyntheticTest(string name);
    }
}
