using Core.Domain.Models;
using Core.Infrastructure.Map;
using Microsoft.EntityFrameworkCore;

namespace Core.Infrastructure.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<SyntheticTest> SyntheticTests { get; set; }

        public DbSet<MLTraining> MLTraining { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SyntheticTestMapping());
            modelBuilder.ApplyConfiguration(new MLTrainingMapping());

            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SyntheticTest>()
                .HasData(
                    new SyntheticTest { Id = 1, Description = "envio-ordem-clear-pro", DetectiveTestId = "" },
                    new SyntheticTest { Id = 2, Description = "retirada-clear-pro", DetectiveTestId = "" },
                    new SyntheticTest { Id = 3, Description = "alteracao-dados-clear-pro", DetectiveTestId = "" },
                    new SyntheticTest { Id = 4, Description = "login-clear-pro", DetectiveTestId = "600211ea87d69a0020e10aed" }
                );

            modelBuilder.Entity<MLTraining>()
                .HasData(
                    new MLTraining { Id = 1, Rating = 100, NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature", SyntheticTest = "envio-ordem-clear-pro" },
                    new MLTraining { Id = 2, Rating = 100, NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature", SyntheticTest = "retirada-clear-pro" },
                    new MLTraining { Id = 3, Rating = 100, NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature", SyntheticTest = "alteracao-dados-clear-pro" },
                    new MLTraining { Id = 4, Rating = 0, NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature", SyntheticTest = "login-clear-pro" },

                    new MLTraining { Id = 5, Rating = 0, NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login", SyntheticTest = "envio-ordem-clear-pro" },
                    new MLTraining { Id = 6, Rating = 0, NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login", SyntheticTest = "retirada-clear-pro" },
                    new MLTraining { Id = 7, Rating = 0, NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login", SyntheticTest = "alteracao-dados-clear-pro" },
                    new MLTraining { Id = 8, Rating = 100, NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login", SyntheticTest = "login-clear-pro" }
                );


        }
    }
}
