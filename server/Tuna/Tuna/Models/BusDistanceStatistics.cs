using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tuna.Models
{
    public class BusDistanceStatistics
    {
        public string ReadableDistance { get; set; }
        public int DistanceInMeters { get; set; }
        public string GeographicDistanceDescription { get; set; }
    }
}
