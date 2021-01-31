﻿// <auto-generated />
using Core.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20210131130857_detective-test")]
    partial class detectivetest
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Core.Domain.Models.MLTraining", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NocAlert")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<float>("Rating")
                        .HasColumnType("real");

                    b.Property<string>("SyntheticTest")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("MLTraining");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature",
                            Rating = 100f,
                            SyntheticTest = "envio-ordem-clear-pro"
                        },
                        new
                        {
                            Id = 2,
                            NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature",
                            Rating = 100f,
                            SyntheticTest = "retirada-clear-pro"
                        },
                        new
                        {
                            Id = 3,
                            NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature",
                            Rating = 100f,
                            SyntheticTest = "alteracao-dados-clear-pro"
                        },
                        new
                        {
                            Id = 4,
                            NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature",
                            Rating = 0f,
                            SyntheticTest = "login-clear-pro"
                        },
                        new
                        {
                            Id = 5,
                            NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login",
                            Rating = 0f,
                            SyntheticTest = "envio-ordem-clear-pro"
                        },
                        new
                        {
                            Id = 6,
                            NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login",
                            Rating = 0f,
                            SyntheticTest = "retirada-clear-pro"
                        },
                        new
                        {
                            Id = 7,
                            NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login",
                            Rating = 0f,
                            SyntheticTest = "alteracao-dados-clear-pro"
                        },
                        new
                        {
                            Id = 8,
                            NocAlert = "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login",
                            Rating = 100f,
                            SyntheticTest = "login-clear-pro"
                        });
                });

            modelBuilder.Entity("Core.Domain.Models.SyntheticTest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DetectiveTestId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SyntheticTest");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "envio-ordem-clear-pro"
                        },
                        new
                        {
                            Id = 2,
                            Description = "retirada-clear-pro"
                        },
                        new
                        {
                            Id = 3,
                            Description = "alteracao-dados-clear-pro"
                        },
                        new
                        {
                            Id = 4,
                            Description = "login-clear-pro"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
