using Core.Contract;
using Core.Infrastructure.Context;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Application
{
    public class SyntheticTestsApplicationService : ISyntheticTestsApplicationService
    {
        private readonly ApplicationContext _applicationContext;

        public SyntheticTestsApplicationService(ApplicationContext applicationContext)
        {
            _applicationContext = applicationContext;
        }

        public async Task ExecuteAsync()
        {
            var nocAlert = new NocAlert()
            {
                Host = "Appdynamics_PRD_Clear.Security.API",
                Description = "HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature"
            };

            Console.WriteLine($"\n ALERT: {nocAlert.Host} - {nocAlert.Description}");

            var sintheticTests = _applicationContext.SyntheticTests.ToList();

            sintheticTests.ForEach(test =>
            {
                var input = new ArtificialIntelligenceInput()
                {
                    Alert_noc = $"{nocAlert.Host} {nocAlert.Description}",
                    Recomended_synthetic_test = test.Description,
                };

                var predictionResult = ConsumeModel.Predict(input);

                test.Rating = predictionResult.Score;

            });

            List<SyntheticTest> top3recomendedTests = getTop3BestRecommended(sintheticTests);

            Console.WriteLine("\n=============== Top 3 recommended tests ===============");

            top3recomendedTests.ForEach(test =>
            {
                Console.WriteLine($"Recomended_synthetic_test: {test.Description} - Rating: {test.Rating}");
            });

            Console.WriteLine("\n=============== Initializing tests ===============");

            var threads = new List<Task<SyntheticTestResult>>();
            top3recomendedTests.ForEach(test =>
            {
                threads.Add(Task<SyntheticTestResult>.Run(() => new SyntheticWorker().StartSyntheticTest(test.Description)));

            });

            Task.WaitAll(threads.ToArray());

            if (threads.All(x => x.IsCompletedSuccessfully && x.Result == null))
            {
                new ZabbixIntegrator().AckAlert(nocAlert);
                await new BotIntegrator().NotifyAsync(threads.Select(x => x.Result));
            }

            //dar ack 
            //enviar bot
            Console.WriteLine("=============== End of process, hit any key to finish ===============");
            Console.ReadKey();

            //realizar ack do alerta no Noc
            //enviar resultado pro Teams via bot
        }


        private static List<SyntheticTest> getTop3BestRecommended(List<SyntheticTest> sintheticTests)
        {
            return sintheticTests
                .Where(x => x.Rating > 90.0)
                .OrderByDescending(x => x.Rating).Take(3).ToList();
        }
    }
}
