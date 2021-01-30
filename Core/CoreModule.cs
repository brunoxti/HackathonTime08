using Core.Application.Services;
using Core.Application.Contract;
using Core.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
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
            services.AddTransient<ISyntheticTestsApplicationService, SyntheticTestsApplicationService>();
            services.AddTransient<IBotApplicationService, BotApplicationService>();
            services.AddTransient<IZabbixIntegratorApplicationService, ZabbixIntegratorApplicationService>();
            services.AddTransient<ISyntheticWorkerApplicationService, SyntheticWorkerApplicationService>();
        }
    }
}