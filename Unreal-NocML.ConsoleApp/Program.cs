using Core.Models;
using Infrastructure;
using Infrastructure.Context;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using Unreal_NocML.Model;

namespace Unreal_NocML.ConsoleApp
{
    public class Program
    {
        private static ApplicationContext _context;

        static void Main(string[] args)
        {
            ConfigureDatabase();
         

            Console.WriteLine("=============== Start of process, hit any key to finish ===============");

            var nocAlert = new NocAlert()
            {
                Host = "Appdynamics_PRD_Clear.Security.API",
                Description = "HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature"
            };

            Console.WriteLine($"\n ALERT: {nocAlert.Host} - {nocAlert.Description}");

            var sintheticTests = _context.SyntheticTests.ToList();

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

            //dar ack 
            //enviar bot
            Console.WriteLine("=============== End of process, hit any key to finish ===============");
            Console.ReadKey();


        }

        private static List<SyntheticTest> getTop3BestRecommended(List<SyntheticTest> sintheticTests)
        {
            return sintheticTests
                .Where(x => x.Rating > 90.0)
                .OrderByDescending(x => x.Rating).Take(3).ToList();
        }

        private static void ConfigureDatabase()
        {
            var services = new ServiceCollection();

            InfraModule.ConfigureDatabase(services);

            var serviceProvider = services.BuildServiceProvider();

            _context = serviceProvider.GetService<ApplicationContext>();

            _context.Database.EnsureCreated();
        }
    }
}
