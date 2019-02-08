using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tuna.Models
{
    public class BusDistanceStatistics
    {
        public static readonly int MetersDrivenPerFoodWasteBag = 250;
        public int DistanceInMeters { get; set; }

        // Human friendly display value for distance. Either in meters or kilometers
        public string ReadableDistance
        {
            get
            {
                // Return value in proper unit. Use kilometers with decimals if more than thousand meters
                return DistanceInMeters < 1000 ? $"{DistanceInMeters}m" : $"{DistanceInMeters / 1000F}km";
            }
        }

        // A string that helps the user understand how far the distance is, by giving an example
        public string GeographicDistanceDescription
        {
            get { return GenerateGeographicDistanceDescription(DistanceInMeters); }
        }

        private string GenerateGeographicDistanceDescription(int meters)
        {
            if (meters < 250)
            {
                return "Det er ikke særlig langt";
            }
            else if (meters < 300)
            {
                return "Det tilsvarer litt over en halv runde inne på Bislett stadion";
            }
            else if (meters < 500)
            {
                return "Det er ca like langt som fra Jernbanetorget til Stortinget";
            }
            else if (meters < 1000)
            {
                return "Det er ca like langt som fra Rådhuset til badeplassen Tjuvholmen";
            }
            else if (meters < 1500)
            {
                return "Det er ca like langt som fra Grünerløkka til Tøyen";
            }
            else if (meters < 2500)
            {
                return "Det er ca like langt som fra Grønland til Sofienbergparken";
            }
            else
            {
                return = "Det er lengre enn fra Oslo s til Majorstuen";
            }
        }
    }
}
}
