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
            var householdId = Context.Households.Where(x => x.OwnerId == HttpContext.User.GetClaim("sub").Value).FirstOrDefault().HouseholdId;
            var collections = Context.WasteCollections.Where(x => x.HouseholdId == householdId && x.CollectionDate >= timespan.FromDate);
            return Ok(WasteDistributionHelper.GetAverageDistributionFromWasteCollections(collections));
        }

        /// <summary>
        /// Mocks an average waste distribution for each district
        /// </summary>
        /// <param name="district"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("/api/statistics/{district}/")]
        public ActionResult<TrashDistribution> GetStatisticsForDistrict(District district)
        {
            return Ok(MockedAverageDistributionByDistrict.GetMockedDistribution(district));
        }

        [Authorize]
        [HttpPost]
        [Route("/api/statistics/foodwaste/busdistance/me")]
        public ActionResult<BusDistanceStatistics> GetBusDistanceForMyFoodWaste([FromBody]TimeSpanRequest timespan)
        {
            var householdId = Context.Households.Where(x => x.OwnerId == HttpContext.User.GetClaim("sub").Value).FirstOrDefault().HouseholdId;
            var numberOfFoodWasteBagsCollected = Context.WasteCollections.Where(x => x.HouseholdId == householdId && x.CollectionDate >= timespan.FromDate).Sum(x => x.FoodWaste);
            var busStatistics = new BusDistanceStatistics()
            {
                DistanceInMeters = numberOfFoodWasteBagsCollected * 250
            };

            // Set readable distance to either meters or kilometers
            if (busStatistics.DistanceInMeters < 1000)
            {
                busStatistics.ReadableDistance = busStatistics.DistanceInMeters + "m";
            }
            else
            {
                busStatistics.ReadableDistance = (float)busStatistics.DistanceInMeters / (float)1000 + "km";
            }
            SetToFromPlacesBasedOnDistanceTraveled(busStatistics);
            return busStatistics;

        }

        private void SetToFromPlacesBasedOnDistanceTraveled(BusDistanceStatistics stats)
        {
            if (stats.DistanceInMeters < 250)
            {
                stats.GeographicDistanceDescription = "Det er ikke særlig langt";
            }
            else if (stats.DistanceInMeters < 300)
            {
                stats.GeographicDistanceDescription = "Det tilsvarer litt over en halv runde inne på Bislett stadion";
            }
            else if (stats.DistanceInMeters < 500)
            {
                stats.GeographicDistanceDescription = "Det er ca like langt som fra Jernbanetorget til Stortinget";
            }
            else if (stats.DistanceInMeters < 1000)
            {
                stats.GeographicDistanceDescription = "Det er ca like langt som fra Rådhuset til badeplassen Tjuvholmen";
            }
            else if (stats.DistanceInMeters < 1500)
            {
                stats.GeographicDistanceDescription = "Det er ca like langt som fra Grünerløkka til Tøyen";
            }
            else if (stats.DistanceInMeters < 2500)
            {
                stats.GeographicDistanceDescription = "Det er ca like langt som fra Grønland til Sofienbergparken";
            }
            else
            {
                stats.GeographicDistanceDescription = "Det er lengre enn fra Oslo s til Majorstuen";
            }
        }

        /// <summary>
        ///// Will get statistics based on matching family type from database
        ///// </summary>
        ///// <param name="p"></param>
        ///// <returns></returns>
        //[HttpPost]
        //[Route("/api/statistics/{district}")]
        //public ActionResult<TrashDistribution> GetStatisticsForFamilyType([FromBody] HouseholdComparisonParameters p)
        //{
        //    var households = Context.Households.Where(x => x.NumberOfAdults == p.NumberOfAdults && x.NumberOfChildren == p.NumberOfChildren).Select(x => x.HouseholdId);
        //    if (p.District != District.All) {
        //        return Ok(WasteDistributionHelper.GetAverageDistributionFromWasteCollections(households));
        //    }
        //    Context.WasteCollections.Where(x => households.Contains(x.Household.HouseholdId))
        //}
    }
}
