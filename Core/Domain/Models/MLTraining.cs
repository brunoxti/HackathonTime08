using System;

namespace Core.Domain.Models
{
    public class MLTraining
    {
        public int Id { get; set; }
        public Single Rating { get; set; }
        public string NocAlert { get; set; }
        public string SyntheticTest { get; set; }
    }
}
