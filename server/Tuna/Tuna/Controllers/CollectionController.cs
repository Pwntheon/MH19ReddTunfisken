using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tuna.Helpers;
using Tuna.Mocks;
using Tuna.Models;

namespace Tuna.Controllers
{
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private TunaContext Context;
        public CollectionController(TunaContext ctx)
        {
            Context = ctx;
        }

        /// <summary>
        /// Registers collection for authorized user
        /// </summary>
        /// <param name="collection"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("/api/collection/register/me")]
        public async Task<ActionResult<WasteCollection>> RegisterCollectionForSelf([FromBody] WasteCollection collection)
        {
            collection.HouseholdId = Context.Households.Where(x => x.OwnerId == HttpContext.User.GetClaim("sub").Value).FirstOrDefault().HouseholdId;
            return await RegisterCollectionAsync(collection);
        }

        /// <summary>
        /// Registers collection for user specified in body
        /// </summary>
        /// <param name="collection"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("/api/collection/register/")]
        public async Task<ActionResult<WasteCollection>> RegisterCollection([FromBody] WasteCollection collection)
        {
            return await RegisterCollectionAsync(collection);
        }

        private async Task<ActionResult<WasteCollection>> RegisterCollectionAsync(WasteCollection collection)
        {
            RegisterPointsForCollection(collection);
            await Context.WasteCollections.AddAsync(collection);
            await Context.SaveChangesAsync();
            return Ok(collection);
        }

        private void RegisterPointsForCollection(WasteCollection collection)
        {
            var household = Context.Households.Where(x => x.HouseholdId == collection.HouseholdId).FirstOrDefault();

            var avg = MockedAverageDistributionByDistrict.GetMockedDistribution(household.District);
            var totalAverageBags = avg.PlasticWaste + avg.ResidualWaste + avg.FoodWaste;

            var totalBagsCollected = collection.PlasticWaste + collection.ResidualWaste + collection.FoodWaste;

            var multiplier = totalAverageBags / totalBagsCollected - 1;
            var pointsGiven = 100 * multiplier;

            household.Points += 100;
        }
    }
}
