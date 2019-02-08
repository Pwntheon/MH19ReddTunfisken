using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tuna.Models;

namespace Tuna.Helpers
{
    public static class WasteDistributionHelper
    {
        public static TrashDistribution GetAverageDistributionFromWasteCollections(IEnumerable<WasteCollection> collections)
        {
            var numberOfCollections = collections.Count();
            return new TrashDistribution
            {
                FoodWaste = collections.Sum(x => x.FoodWaste) / numberOfCollections,
                PlasticWaste = collections.Sum(x => x.PlasticWaste) / numberOfCollections,
                ResidualWaste = collections.Sum(x => x.ResidualWaste) / numberOfCollections
            };
        }
    }
}
