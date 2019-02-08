using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Tuna.Migrations
{
    public partial class points : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WasteCollections_Households_HouseholdId",
                table: "WasteCollections");

            migrationBuilder.DropIndex(
                name: "IX_WasteCollections_HouseholdId",
                table: "WasteCollections");

            migrationBuilder.AlterColumn<Guid>(
                name: "HouseholdId",
                table: "WasteCollections",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "Households",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Points",
                table: "Households");

            migrationBuilder.AlterColumn<Guid>(
                name: "HouseholdId",
                table: "WasteCollections",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.CreateIndex(
                name: "IX_WasteCollections_HouseholdId",
                table: "WasteCollections",
                column: "HouseholdId");

            migrationBuilder.AddForeignKey(
                name: "FK_WasteCollections_Households_HouseholdId",
                table: "WasteCollections",
                column: "HouseholdId",
                principalTable: "Households",
                principalColumn: "HouseholdId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
