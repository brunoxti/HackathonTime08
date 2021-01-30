using Core.Application.IntegrationContracts;
using Core.Domain.Models;
using System;
using System.Threading.Tasks;

namespace Core.Infrastructure.Services
{
    public class SyntheticWorkerIntegrationService : ISyntheticWorkerIntegrationService
    {
        public Task<SyntheticTestResult> StartSyntheticTest(string name)
        {
            Console.WriteLine("=============== End of process, hit any key to finish ===============");

            return Task.FromResult(new SyntheticTestResult());
        }
    }
}
