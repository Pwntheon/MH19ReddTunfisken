using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tuna.Models
{
    public class BusDistanceStatistics
    {
        public static readonly int MetersDrivenPerFoodWasteBag = 250;
        private static readonly SortedDictionary<int, string> DistanceMilestones = new SortedDictionary<int, string> {
                { 250, "Det er ikke særlig langt" },
                { 300, "Det tilsvarer litt over en halv runde inne på Bislett stadion" },
                { 500, "Det er ca like langt som fra Jernbanetorget til Stortinget" },
                { 1000, "Det er ca like langt som fra Rådhuset til badeplassen Tjuvholmen" },
                { 1500, "Det er ca like langt som fra Grünerløkka til Tøyen" },
                { 2500, "Det er ca like langt som fra Grønland til Sofienbergparken" },
                { 3500, "Det er lengre enn fra Oslo s til Majorstuen" }
            };

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
            get { return GetDistanceMilestone(DistanceInMeters); }
        }

        private string GetDistanceMilestone(int meters)
        {
            foreach (var milestone in DistanceMilestones.ToList())
            {
                if (meters < milestone.Key)
                    return milestone.Value;
            }
            return "Det er veldig langt";
        }
    }
}
