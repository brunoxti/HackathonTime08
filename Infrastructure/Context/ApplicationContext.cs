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

            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SyntheticTest>()
                .HasData(
                    new { Id = 1, Description = "envio-ordem-clear-pro" },
                    new { Id = 2, Description = "retirada-clear-pro" },
                    new { Id = 3, Description = "alteracao-dados-clear-pro" },
                    new { Id = 4, Description = "login-clear-pro" }
                );
        }
    }
}
