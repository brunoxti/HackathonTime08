using Core.Models;
using System;

namespace Core.Concrete
{
    public class ZabbixIntegrator
    {
        public void AckAlert(NocAlert nocAlert)
        {
            Console.WriteLine("=============== End of process, hit any key to finish ===============");
        }
    }
}
