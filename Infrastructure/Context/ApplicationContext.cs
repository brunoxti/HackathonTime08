using Core.Models;
using Infrastructure.Map;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<SyntheticTest> SyntheticTests { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SyntheticTestMapping());
        }
    }
}
