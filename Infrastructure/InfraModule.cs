using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class InfraModule
    {
        public static void ConfigureDatabase(this IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=HackatonNoc;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"));
        }
    }
}
