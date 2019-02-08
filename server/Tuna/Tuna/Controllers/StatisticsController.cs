using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        [Route("/api/statistics/me/")]
        public ActionResult<TrashDistribution> GetStatistics([FromBody] DateTime FromDate)
        {
            var householdId = Context.Households.Where(x => x.OwnerId == HttpContext.User.GetClaim("sub").Value).FirstOrDefault().HouseholdId;
            var collections = Context.WasteCollections.Where(x => x.HouseholdId == householdId && x.CollectionDate >= FromDate);
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
