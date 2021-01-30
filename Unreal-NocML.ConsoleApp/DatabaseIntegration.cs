using Core.Models;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Unreal_NocML.ConsoleApp
{
    public static class DatabaseIntegration
    {
        public async static void Seed()
        {
            using (var context = new ApplicationContext())
            {
                if (await context.SyntheticTests.AnyAsync())
                    return;

                context.Database.Migrate();

                var test1 = new SyntheticTest();
                test1.Description = "envio-ordem-clear-pro";
                context.Add(test1);
                context.SaveChanges();

                var test2 = new SyntheticTest();
                test2.Description = "retirada-clear-pro";
                context.Add(test2);
                context.SaveChanges();

                var test3 = new SyntheticTest();
                test3.Description = "alteracao-dados-clear-pro";
                context.Add(test3);
                context.SaveChanges();

                var test4 = new SyntheticTest();
                test4.Description = "login-clear-pro";
                context.Add(test4);
                context.SaveChanges();
            }
        }

        public static List<SyntheticTest> GetSyntheticTest()
        {
            using (var context = new ApplicationContext())
            {
                return context.SyntheticTests.ToList();
            }
        }
    }
}
