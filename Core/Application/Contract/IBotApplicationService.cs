using Core.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Application.Contract
{
    public interface IBotApplicationService
    {
        Task NotifyAsync(NocAlert alert, IEnumerable<SyntheticTestResult> enumerable);
    }
}
