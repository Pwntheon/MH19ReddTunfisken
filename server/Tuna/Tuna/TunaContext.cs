using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tuna.Models;

namespace Tuna
{
    public class TunaContext : DbContext
    {
        public TunaContext(DbContextOptions<TunaContext> options) : base(options)
        {
            Database.EnsureCreated();
            Database.Migrate();
        }
        public DbSet<Household> Households { get; set; }
        public DbSet<WasteCollection> WasteCollections { get; set; }
        public DbSet<AverageTrashDistribution> AverageTrashDistribution { get; set; }
    }
}
