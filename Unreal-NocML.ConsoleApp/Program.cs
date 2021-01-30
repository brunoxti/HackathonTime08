using Core;
using Core.Infrastructure.Context;
using Microsoft.Extensions.DependencyInjection;
using Core.Application.Contract;

namespace Unreal_NocML.ConsoleApp
{
    public class Program
    {
        private static ApplicationContext _context;
        private static ISyntheticTestsApplicationService _syntheticTestsApplicationService;

        static void Main(string[] args)
        {
            ConfigureServices();
            ConfigureDatabase();

            _syntheticTestsApplicationService.ExecuteAsync().Wait();
        }

        private static void ConfigureServices()
        {
            var services = new ServiceCollection();

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
