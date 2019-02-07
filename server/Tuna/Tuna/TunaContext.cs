using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tuna
{
    public class TunaContext : DbContext
    {
        public TunaContext(DbContextOptions<TunaContext> options) : base(options)
        {
        }
        //public DbSet<Post> Posts { get; set; }
    }
}
