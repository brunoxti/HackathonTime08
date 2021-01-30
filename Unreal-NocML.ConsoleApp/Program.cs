using Core;
using Core.Application;
using Core.Infrastructure.Context;
using Microsoft.Extensions.DependencyInjection;

namespace Unreal_NocML.ConsoleApp
{
    public class Program
    {
        private static ApplicationContext _context;

        static void Main(string[] args)
        {
            ConfigureServices();
            ConfigureDatabase();

            new SyntheticTestsApplication(_context).ExecuteAsync().Wait();
        }

        private static void ConfigureServices()
        {
            var services = new ServiceCollection();

            CoreModule.ConfigureDatabase(services);

            var serviceProvider = services.BuildServiceProvider();

            _context = serviceProvider.GetService<ApplicationContext>();
        }

        private static void ConfigureDatabase()
        {
            _context.Database.EnsureCreated();
        }
    }
}
