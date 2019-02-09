using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tuna.Models
{
    public class BusDistanceStatistics
    {
        public BusDistanceStatistics(int distanceInMeters)
        {
            DistanceInMeters = distanceInMeters;
        }
        public static readonly int MetersDrivenPerFoodWasteBag = 250;
        private static readonly SortedDictionary<int, string> DistanceMilestones = new SortedDictionary<int, string> {
                { 250, "Det er ikke særlig langt" },
                { 300, "Det tilsvarer litt over en halv runde inne på Bislett stadion" },
                { 500, "Det er ca like langt som fra Jernbanetorget til Stortinget" },
                { 1000, "Det er ca like langt som fra Rådhuset til badeplassen på Tjuvholmen" },
                { 1500, "Det er ca like langt som fra Grünerløkka til Tøyen" },
                { 2500, "Det er ca like langt som fra Grønland til Sofienbergparken" },
                { 3500, "Det er lengre enn fra Oslo s til Majorstuen" },
                { int.MaxValue, "Det er veldig langt" }
            };

        public int DistanceInMeters { get; }

        // Human friendly display value for distance. Either in meters or kilometers
        public string ReadableDistance
        {
            get
            {
                // Return value in proper unit. Use kilometers with decimals if more than thousand meters
                return DistanceInMeters < 1000 ? $"{DistanceInMeters}m" : $"{DistanceInMeters / 1000F}km";
            }
        }

        // Helps the user understand how far the distance is, by giving an example
        public string GeographicDistanceDescription
        {
            get { return DistanceMilestones.Where(x => x.Key > DistanceInMeters).First().Value; }
        }
    }
}
