using System;
using System.Threading.Tasks;

namespace Core.Models
{
    public class SyntheticTest
    {
        public Guid Id { get; set; }

        public string Description { get; set; }

        public Task<bool> ExecuteAsync()
        {
            throw new NotImplementedException();
        }
    }
}
