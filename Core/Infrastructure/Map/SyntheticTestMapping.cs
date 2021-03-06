﻿using Core.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Infrastructure.Map
{
    public class SyntheticTestMapping : IEntityTypeConfiguration<SyntheticTest>
    {
        public void Configure(EntityTypeBuilder<SyntheticTest> builder)
        {
            builder.ToTable("SyntheticTest");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Description).IsRequired();
        }
    }
}
