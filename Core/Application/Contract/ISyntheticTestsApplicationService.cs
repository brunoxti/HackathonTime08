using System.Threading.Tasks;

namespace Core.Application.Contract
{
    public interface ISyntheticTestsApplicationService
    {
        Task ExecuteAsync(string alert);
    }
}
