using Core.Application.IntegrationContracts;
using Core.Domain.Models;
using System;
using System.Threading.Tasks;

namespace Core.Application.Services
{
    public class ZabbixIntegrationService : IZabbixIntegrationService
    {
        public async Task AckAlert(NocAlert nocAlert)
        {
            Console.WriteLine("=============== End of process, hit any key to finish ===============");
        }
    }
}
