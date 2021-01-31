using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.Migrations
{
    public partial class mltraining : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MLTraining",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<float>(nullable: false),
                    NocAlert = table.Column<string>(nullable: false),
                    SyntheticTest = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MLTraining", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "MLTraining",
                columns: new[] { "Id", "NocAlert", "Rating", "SyntheticTest" },
                values: new object[,]
                {
                    { 1, "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature", 100f, "envio-ordem-clear-pro" },
                    { 2, "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature", 100f, "retirada-clear-pro" },
                    { 3, "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature", 100f, "alteracao-dados-clear-pro" },
                    { 4, "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/ValidateSignature", 0f, "login-clear-pro" },
                    { 5, "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login", 0f, "envio-ordem-clear-pro" },
                    { 6, "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login", 0f, "retirada-clear-pro" },
                    { 7, "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login", 0f, "alteracao-dados-clear-pro" },
                    { 8, "Appdynamics_PRD_Clear.Security.API HR: Business_Transaction_error_rate_is_much_higher_than_normal | TIER: Clear.Security.API | BT: /Account/Login", 100f, "login-clear-pro" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MLTraining");
        }
    }
}
