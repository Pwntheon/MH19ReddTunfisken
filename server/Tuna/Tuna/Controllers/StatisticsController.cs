using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tuna.Helpers;
using Tuna.Mocks;
using Tuna.Models;

namespace Tuna.Controllers
{
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private TunaContext Context;
        public StatisticsController(TunaContext ctx)
        {
            Context = ctx;
        }

        /// <summary>
        /// Gets the average distribution of waste collected for a given household between to-date and today
        /// </summary>
        /// <param name="FromDate"></param>
        /// <param name="ToDate"></param>
        /// <returns>The average waste distribution</returns>
        [HttpPost]
        [Authorize]
        [Route("/api/statistics/me/")]
        public ActionResult<TrashDistribution> GetStatistics([FromBody] TimeSpanRequest timespan)
        {
            var householdId = HttpContext.User.GetHouseHoldId(Context);
            var collections = Context.WasteCollections.Where(x => x.HouseholdId == householdId && x.CollectionDate >= timespan.FromDate);
            return Ok(WasteDistributionHelper.GetAverageDistributionFromWasteCollections(collections));
        }

        /// <summary>
        /// Mocks an average waste distribution for each district
        /// </summary>
        /// <param name="district"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("/api/statistics/{district}/")]
        public ActionResult<TrashDistribution> GetStatisticsForDistrict([FromBody] TimeSpanRequest timespan, District district)
        {
            return Ok(MockedAverageDistributionByDistrict.GetMockedDistribution(district));
        }

        /// <summary>
        /// Calculates the theoretical distance a bus could drive based on how much food waste the authenticated user has produced
        /// The calculation is performed on the collections that occured after the provided DateTime in TimeSpanRequest
        /// </summary>
        /// <param name="timespan"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("/api/statistics/foodwaste/busdistance/me")]
        public ActionResult<BusDistanceStatistics> GetBusDistanceForMyFoodWaste([FromBody]TimeSpanRequest timespan)
        {
            var householdId = HttpContext.User.GetHouseHoldId(Context);
            var numberOfFoodWasteBagsCollected = Context.WasteCollections.Where(x => x.HouseholdId == householdId && x.CollectionDate >= timespan.FromDate).Sum(x => x.FoodWaste);
            var busStatistics = new BusDistanceStatistics()
            {
                DistanceInMeters = numberOfFoodWasteBagsCollected * BusDistanceStatistics.MetersDrivenPerFoodWasteBag
            };

            return busStatistics;
        }



    }
}
