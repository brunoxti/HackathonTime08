using Microsoft.ML.Data;

namespace Core.Domain.Models
{
    public class ArtificialIntelligenceInput
    {
        [ColumnName("rating"), LoadColumn(0)]
        public float Rating { get; set; }


        [ColumnName("alert_noc"), LoadColumn(1)]
        public string Alert_noc { get; set; }


        [ColumnName("recomended_synthetic_test"), LoadColumn(2)]
        public string Recomended_synthetic_test { get; set; }
    }
}
