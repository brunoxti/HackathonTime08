using Core.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Infrastructure.Map
{
    public class MLTrainingMapping : IEntityTypeConfiguration<MLTraining>
    {
        public void Configure(EntityTypeBuilder<MLTraining> builder)
        {
            builder.ToTable("MLTraining");
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Id).UseSqlServerIdentityColumn().ValueGeneratedOnAdd();

            builder.Property(p => p.Rating).IsRequired();
            builder.Property(p => p.NocAlert).IsRequired();
            builder.Property(p => p.SyntheticTest).IsRequired();
        }
    }
}
