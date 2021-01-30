using Core.Application.Contract;
using Core.Domain.Models;
using System;
using System.Threading.Tasks;

namespace Core.Application.Services
{
    public class SyntheticWorkerApplicationService : ISyntheticWorkerApplicationService
    {
        public Task<SyntheticTestResult> StartSyntheticTest(string name)
        {
            Console.WriteLine("=============== End of process, hit any key to finish ===============");

            return Task.FromResult(new SyntheticTestResult());
        }
    }
}
