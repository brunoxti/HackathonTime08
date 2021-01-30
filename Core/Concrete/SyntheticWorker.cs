using Core.Models;
using System;
using System.Threading.Tasks;

namespace Core.Concrete
{
    public class SyntheticWorker
    {
        public Task<SyntheticTestResult> StartSyntheticTest(string name)
        {
            throw new NotImplementedException();
        }
    }
}
