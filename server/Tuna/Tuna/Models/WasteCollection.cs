using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Tuna.Models
{
    public class WasteCollection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CollectionId { get; set; }
        public DateTime CollectionDate { get; set; }
        public Guid HouseholdId { get; set; }
        public int FoodWaste { get; set; }
        public int PlasticWaste { get; set; }
        public int ResidualWaste { get; set; }
    }
}
