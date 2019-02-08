using System.ComponentModel.DataAnnotations;

namespace Tuna.Models
{
    public class AverageTrashDistribution : TrashDistribution
    {
        [Key]
        public District District { get; set; }
    }
}

