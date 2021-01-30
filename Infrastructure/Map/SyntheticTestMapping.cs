using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace Infrastructure.Map
{
    public class SyntheticTestMapping : IEntityTypeConfiguration<SyntheticTest>
    {
        public void Configure(EntityTypeBuilder<SyntheticTest> builder)
        {
            throw new NotImplementedException();
        }
    }
}
