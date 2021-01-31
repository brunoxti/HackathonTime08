using Microsoft.EntityFrameworkCore.Migrations;

namespace Core.Migrations
{
    public partial class detectivetest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DetectiveTestId",
                table: "SyntheticTest",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetectiveTestId",
                table: "SyntheticTest");
        }
    }
}
