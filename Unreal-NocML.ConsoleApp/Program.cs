using Core;
using Core.Application.Contract;
using Core.Infrastructure.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace UnrealNoc.ConsoleApp
{
    public class Program
    {
        private static ApplicationContext _context;
        private static ISyntheticTestsApplicationService _syntheticTestsApplicationService;
        private readonly IConfiguration _configuration;

        static void Main(string[] args)
        {
            ConfigureServices();
            ConfigureDatabase();

            _syntheticTestsApplicationService.ExecuteAsync().Wait();
        }

        private static void ConfigureServices()
        {
            var services = new ServiceCollection();
            var builder = new ConfigurationBuilder().Build();

            CoreModule.ConfigureCoreModule(services);

            var serviceProvider = services.BuildServiceProvider();

            _context = serviceProvider.GetService<ApplicationContext>();
            _syntheticTestsApplicationService = serviceProvider.GetService<ISyntheticTestsApplicationService>();
        }

        private static void ConfigureDatabase()
        {
            _context.Database.EnsureCreated();
        }
    }
}
