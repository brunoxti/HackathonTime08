using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;

namespace Core.Domain.Models
{
    public class SyntheticTest
    {
        public int Id { get; set; }

        public string Description { get; set; }

        [NotMapped]
        public Single Rating { get; set; }

        public Task<bool> ExecuteAsync()
        {
            throw new NotImplementedException();
        }
    }
}
