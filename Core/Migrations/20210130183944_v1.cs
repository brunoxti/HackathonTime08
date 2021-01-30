using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SyntheticTest",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SyntheticTest", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "SyntheticTest",
                columns: new[] { "Id", "Description" },
                values: new object[,]
                {
                    { 1, "envio-ordem-clear-pro" },
                    { 2, "retirada-clear-pro" },
                    { 3, "alteracao-dados-clear-pro" },
                    { 4, "login-clear-pro" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SyntheticTest");
        }
    }
}
