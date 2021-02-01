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
        private readonly IZabbixIntegrationService _zabbixIntegratorApplicationService;
        private readonly IDetectiveIntegrationService _detectiveIntegrationService;

        public SyntheticTestsApplicationService(IBotIntegrationService botApplicationService,
            IZabbixIntegrationService zabbixIntegratorApplicationService,
            IDetectiveIntegrationService detectiveIntegrationService,
            ApplicationContext applicationContext)
        {
            _botApplicationService = botApplicationService;
            _zabbixIntegratorApplicationService = zabbixIntegratorApplicationService;
            _detectiveIntegrationService = detectiveIntegrationService;
            _applicationContext = applicationContext;
        }

        public async Task ExecuteAsync()
        {

            //Receive alert from Zabbix            
            var nocAlert = getNocAlert();

            Console.WriteLine($"\n ALERT: {nocAlert.opdata} - {nocAlert.name}");

            var sintheticTests = _applicationContext.SyntheticTests.ToList();

            //IA Calculating the score of each synthetic test.
            SyntheticTest bestTest = FoundBestTest(nocAlert, sintheticTests);

            Console.WriteLine("\n=============== Best test found ===============");
            Console.WriteLine($"Recomended_synthetic_test: {bestTest.Description} - Rating: {bestTest.Rating}");

            Console.WriteLine("\n=============== Initializing tests ===============");
            var result = await _detectiveIntegrationService.ExecuteSyntheticTest(bestTest.DetectiveTestId);

            if (result.Status == "success")
            {
                Console.WriteLine("\n=============== Sending Teams Notification ===============");
                await _botApplicationService.NotifyFalsePositiveAsync(nocAlert, bestTest, result.VideoUrl);

                Console.WriteLine("\n=============== Closing alert using Zabbix ===============");
                await _zabbixIntegratorApplicationService.WorkerAlert(nocAlert.eventid);

            }
            else if (result.Status == "error" && string.IsNullOrEmpty(result.VideoUrl))
            {
                await _botApplicationService.NotifySyntheticTestFailed(nocAlert, bestTest, result.VideoUrl);
            }

            Console.WriteLine("=============== End of process, hit any key to finish ===============");
            Console.ReadKey();

        }

        private static SyntheticTest FoundBestTest(Result nocAlert, List<SyntheticTest> sintheticTests)
        {
            sintheticTests.ForEach(test =>
            {
                var input = new ArtificialIntelligenceInput()
                {
                    Alert_noc = $"{nocAlert.opdata} {nocAlert.name}",
                    Recomended_synthetic_test = test.Description,
                };

                var predictionResult = Predict(input);

                test.Rating = predictionResult.Score;

            });

            return sintheticTests
                .OrderByDescending(x => x.Rating).FirstOrDefault();

        }

        private Result getNocAlert()
        {
            return new Result
            {
                eventid = "4795676",
                opdata = "Appdynamics_PRD_Clear.Security.API",
                name = "HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login"
            };
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
