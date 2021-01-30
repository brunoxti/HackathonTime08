// This file was auto-generated by ML.NET Model Builder. 

using System;
using Unreal_NocML.Model;

namespace Unreal_NocML.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            DatabaseIntegration.Seed();

            var scenarios = DatabaseIntegration.GetSyntheticTest();

            // Create single instance of sample data from first line of dataset for model input
            ModelInput sampleData = new ModelInput()
            {
                Alert_noc = @"Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature",
                Recomended_synthetic_test = @"envio-ordem-clear-pro",
            };

            // Make a single prediction on the sample data and print results
            var predictionResult = ConsumeModel.Predict(sampleData);

            Console.WriteLine("Using model to make single prediction -- Comparing actual Rating with predicted Rating from sample data...\n\n");
            Console.WriteLine($"Alert_noc: {sampleData.Alert_noc}");
            Console.WriteLine($"Recomended_synthetic_test: {sampleData.Recomended_synthetic_test}");
            Console.WriteLine($"\n\nPredicted Rating: {predictionResult.Score}\n\n");
            Console.WriteLine("=============== End of process, hit any key to finish ===============");
            Console.ReadKey();
        }
    }
}
