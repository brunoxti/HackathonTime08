using Core.Application.Contract;
using Core.Application.IntegrationContracts;
using Core.Application.Services;
using Core.Infrastructure.Context;
using Core.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core
{
    public static class CoreModule
    {
        public static void ConfigureCoreModule(this IServiceCollection services)
        {
            ConfigureDatabase(services);
            ConfigureServices(services);
        }

        private static void ConfigureDatabase(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=HackatonXpNoc;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"));
        }

        private static void ConfigureServices(this IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(new ConfigurationBuilder().Build());
            services.AddHttpClient();
            services.AddTransient<ISyntheticTestsApplicationService, SyntheticTestsApplicationService>();
            services.AddTransient<IBotIntegrationService, BotIntegrationService>();
            services.AddTransient<IZabbixIntegrationService, ZabbixIntegrationService>();
            services.AddTransient<ISyntheticWorkerIntegrationService, SyntheticWorkerIntegrationService>();
            services.AddTransient<IDetectiveIntegrationService, DetectiveIntegrationService>();
        }
    }
}