using Microsoft.EntityFrameworkCore.Migrations;

namespace Tuna.Migrations
{
    public partial class userhouseholdconnection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Households",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Households");
        }
    }
}
