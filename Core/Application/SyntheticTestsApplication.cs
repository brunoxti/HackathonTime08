using Core.Concrete;
using Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Application
{
    public class SyntheticTestsApplication
    {
        private readonly IA _ia = new IA();

        public async Task ExecuteAsync(NocAlert input)
        {
            var syntheticTests = _ia.Calculate(input);

            var results = new List<bool>();

            foreach (var test in syntheticTests)
            {
                results.Add(await test.ExecuteAsync());
            }

            //realizar ack do alerta no Noc
            //enviar resultado pro Teams via bot

        }
    }
}
