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
            var sumFoodWaste = collections.Sum(x => x.FoodWaste);
            var sumPlasticWaste = collections.Sum(x => x.PlasticWaste);
            var sumResidualWaste = collections.Sum(x => x.ResidualWaste);

            return new TrashDistribution
            {
                FoodWaste = sumFoodWaste == 0 || numberOfCollections == 0 ? 0 : sumFoodWaste / numberOfCollections,
                PlasticWaste = sumPlasticWaste == 0 || numberOfCollections == 0 ? 0 : sumPlasticWaste / numberOfCollections,
                ResidualWaste = sumResidualWaste == 0 || numberOfCollections == 0 ? 0 : sumResidualWaste / numberOfCollections
            };
        }
    }
}
