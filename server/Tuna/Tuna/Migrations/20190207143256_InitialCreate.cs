using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Tuna.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AverageTrashDistribution",
                columns: table => new
                {
                    District = table.Column<int>(nullable: false),
                    FoodWaste = table.Column<float>(nullable: false),
                    PlasticWaste = table.Column<float>(nullable: false),
                    ResidualWaste = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AverageTrashDistribution", x => x.District);
                });

            migrationBuilder.CreateTable(
                name: "Households",
                columns: table => new
                {
                    HouseholdId = table.Column<Guid>(nullable: false),
                    District = table.Column<int>(nullable: false),
                    NumberOfAdults = table.Column<int>(nullable: false),
                    NumberOfChildren = table.Column<int>(nullable: false),
                    Address = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Households", x => x.HouseholdId);
                });

            migrationBuilder.CreateTable(
                name: "WasteCollections",
                columns: table => new
                {
                    CollectionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CollectionDate = table.Column<DateTime>(nullable: false),
                    HouseholdId = table.Column<Guid>(nullable: true),
                    FoodWaste = table.Column<int>(nullable: false),
                    PlasticWaste = table.Column<int>(nullable: false),
                    ResidualWaste = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WasteCollections", x => x.CollectionId);
                    table.ForeignKey(
                        name: "FK_WasteCollections_Households_HouseholdId",
                        column: x => x.HouseholdId,
                        principalTable: "Households",
                        principalColumn: "HouseholdId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WasteCollections_HouseholdId",
                table: "WasteCollections",
                column: "HouseholdId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AverageTrashDistribution");

            migrationBuilder.DropTable(
                name: "WasteCollections");

            migrationBuilder.DropTable(
                name: "Households");
        }
    }
}
