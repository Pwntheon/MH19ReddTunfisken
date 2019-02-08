using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tuna.Mocks;
using Tuna.Models;

namespace Tuna.Services
{
    public class WasteCollectionService
    {
        private TunaContext Context;
        public WasteCollectionService(TunaContext ctx)
        {
            Context = ctx;
        }

        /// <summary>
        /// Registers a waste collection to the database context
        /// Calculates points and updates household point balance before storing
        /// </summary>
        /// <param name="collection"></param>
        /// <returns></returns>
        public async Task<WasteCollection> RegisterWasteCollectionAsync(WasteCollection collection)
        {
            RegisterPointsForCollection(collection);
            await Context.WasteCollections.AddAsync(collection);
            await Context.SaveChangesAsync();
            return collection;
        }

        // User gets points for having less trash collected than the average in the users district
        private void RegisterPointsForCollection(WasteCollection collection)
        {
            var household = Context.Households.Where(x => x.HouseholdId == collection.HouseholdId).FirstOrDefault();

            var districtAverage = MockedAverageDistributionByDistrict.GetMockedDistribution(household.District);
            var districtAverageTotalBags = districtAverage.PlasticWaste + districtAverage.ResidualWaste + districtAverage.FoodWaste;

            var totalBagsCollected = collection.PlasticWaste + collection.ResidualWaste + collection.FoodWaste;

            var pointsMultiplier = districtAverageTotalBags / totalBagsCollected - 1;
            var pointsGiven = 100 * pointsMultiplier;

            household.Points += (int)pointsGiven;
        }
    }
}
