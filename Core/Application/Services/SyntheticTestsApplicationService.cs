using Core.Application.Contract;
using Core.Application.IntegrationContracts;
using Core.Domain.Models;
using Core.Infrastructure.Context;
using Microsoft.ML;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Application.Services
{
    public class SyntheticTestsApplicationService : ISyntheticTestsApplicationService
    {
        public static string MLNetModelPath = Path.GetFullPath("MLModel.zip");

        private readonly ApplicationContext _applicationContext;

        private readonly IBotIntegrationService _botApplicationService;
        private readonly ISyntheticWorkerIntegrationService _syntheticWorkerApplicationService;
        private readonly IZabbixIntegrationService _zabbixIntegratorApplicationService;

        public SyntheticTestsApplicationService(ApplicationContext applicationContext, IBotIntegrationService botApplicationService, ISyntheticWorkerIntegrationService syntheticWorkerApplicationService, IZabbixIntegrationService zabbixIntegratorApplicationService)
        {
            _applicationContext = applicationContext;
            _botApplicationService = botApplicationService;
            _syntheticWorkerApplicationService = syntheticWorkerApplicationService;
            _zabbixIntegratorApplicationService = zabbixIntegratorApplicationService;
        }

        public async Task ExecuteAsync()
        {
            //await _botApplicationService.NotifyAsync(default);
            await _syntheticWorkerApplicationService.StartSyntheticTest(string.Empty);
            await _zabbixIntegratorApplicationService.AckAlert(default);

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

                var predictionResult = Predict(input);

                test.Rating = predictionResult.Score;

            });

            List<SyntheticTest> top3recomendedTests = getTop3BestRecommended(sintheticTests);

            Console.WriteLine("\n=============== Top 3 recommended tests ===============");

            top3recomendedTests.ForEach(test =>
            {
                Console.WriteLine($"Recomended_synthetic_test: {test.Description} - Rating: {test.Rating}");
            });

            Console.WriteLine("\n=============== Initializing tests ===============");

            //var threads = new List<Task<SyntheticTestResult>>();
            //top3recomendedTests.ForEach(test =>
            //{
            //    threads.Add(Task<SyntheticTestResult>.Run(() => new SyntheticWorker().StartSyntheticTest(test.Description)));

            //});

            //Task.WaitAll(threads.ToArray());

            //if (threads.All(x => x.IsCompletedSuccessfully && x.Result == null))
            //{
            //    new ZabbixIntegrator().AckAlert(nocAlert);
            //    await new BotIntegrator().NotifyAsync(threads.Select(x => x.Result));
            //}

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

        public static ArtificialIntelligenceOutput Predict(ArtificialIntelligenceInput input)
        {
            var predictionEngine = new Lazy<PredictionEngine<ArtificialIntelligenceInput, ArtificialIntelligenceOutput>>(CreatePredictionEngine);
            ArtificialIntelligenceOutput result = predictionEngine.Value.Predict(input);
            return result;
        }

        public static PredictionEngine<ArtificialIntelligenceInput, ArtificialIntelligenceOutput> CreatePredictionEngine()
        {
            // Create new MLContext
            MLContext mlContext = new MLContext();

            // Load model & create prediction engine
            ITransformer mlModel = mlContext.Model.Load(Path.GetFullPath("MLModel.zip"), out var modelInputSchema);
            var predEngine = mlContext.Model.CreatePredictionEngine<ArtificialIntelligenceInput, ArtificialIntelligenceOutput>(mlModel);

            return predEngine;
        }
    }
}
