﻿using Core.Application.Contract;
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

        public SyntheticTestsApplicationService(IBotIntegrationService botApplicationService, IZabbixIntegrationService zabbixIntegratorApplicationService, IDetectiveIntegrationService detectiveIntegrationService)
        {
            _botApplicationService = botApplicationService;
            _zabbixIntegratorApplicationService = zabbixIntegratorApplicationService;
            _detectiveIntegrationService = detectiveIntegrationService;
        }

        public async Task ExecuteAsync()
        {
            Console.Write("Enter AlertId: ");
            var val = Console.ReadLine();
            Console.WriteLine("Your input: {0}", val);

            

            //await _botApplicationService.NotifyAsync(default);

            var response = await _detectiveIntegrationService.ExecuteSyntheticTest("600210fc87d69a0020e10aec");

            var nocAlert = new Result
            {
                opdata = "Appdynamics_PRD_Clear.Security.API",
                name = "HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature"
            };

            Console.WriteLine($"\n ALERT: {nocAlert.opdata} - {nocAlert.name}");

            var sintheticTests = _applicationContext.SyntheticTests.ToList();

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

            List<SyntheticTest> top3recomendedTests = getTop3BestRecommended(sintheticTests);

            Console.WriteLine("\n=============== Top 3 recommended tests ===============");

            top3recomendedTests.ForEach(test =>
            {
                Console.WriteLine($"Recomended_synthetic_test: {test.Description} - Rating: {test.Rating}");
            });

            Console.WriteLine("\n=============== Initializing tests ===============");
            await _botApplicationService.NotifyAsync(nocAlert, new List<SyntheticTestResult>());
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

            await _zabbixIntegratorApplicationService.WorkerAlert(val);
        }


        private static List<SyntheticTest> getTop3BestRecommended(List<SyntheticTest> sintheticTests)
        {
            return sintheticTests
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
