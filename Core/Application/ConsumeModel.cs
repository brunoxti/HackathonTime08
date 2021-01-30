using Core.Models;
using Microsoft.ML;
using System;
using System.IO;

namespace Core.Application
{
    public class ConsumeModel
    {
        private static Lazy<PredictionEngine<ArtificialIntelligenceInput, ArtificialIntelligenceOutput>> PredictionEngine = new Lazy<PredictionEngine<ArtificialIntelligenceInput, ArtificialIntelligenceOutput>>(CreatePredictionEngine);

        public static string MLNetModelPath = Path.GetFullPath("MLModel.zip");

        // For more info on consuming ML.NET models, visit https://aka.ms/mlnet-consume
        // Method for consuming model in your app
        public static ArtificialIntelligenceOutput Predict(ArtificialIntelligenceInput input)
        {
            ArtificialIntelligenceOutput result = PredictionEngine.Value.Predict(input);
            return result;
        }

        public static PredictionEngine<ArtificialIntelligenceInput, ArtificialIntelligenceOutput> CreatePredictionEngine()
        {
            // Create new MLContext
            MLContext mlContext = new MLContext();

            // Load model & create prediction engine
            ITransformer mlModel = mlContext.Model.Load(MLNetModelPath, out var modelInputSchema);
            var predEngine = mlContext.Model.CreatePredictionEngine<ArtificialIntelligenceInput, ArtificialIntelligenceOutput>(mlModel);

            return predEngine;
        }
    }
}
