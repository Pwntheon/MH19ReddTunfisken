using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tuna.Helpers;
using Tuna.Models;

namespace Tuna.Controllers
{
    [ApiController]
    public class HouseholdController : ControllerBase
    {
        private TunaContext Context;
        public HouseholdController(TunaContext ctx)
        {
            Context = ctx;
        }

        /// <summary>
        /// Gets the household associated with the authenticated user
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet]
        [Route("/api/household/me")]
        public ActionResult<Household> GetMyHousehold()
        {
            var household = Context.Households.Where(x => x.OwnerId == HttpContext.User.GetClaim("sub").Value).FirstOrDefault();
            if (household == null)
            {
                return NoContent();
            }
            return household;
        }

        /// <summary>
        /// Saves a new household and setting authenticated user as owner
        /// </summary>
        /// <param name="household"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        [Route("/api/household/create")]
        public async Task<ActionResult<Household>> CreateNewHousehold([FromBody] Household household)
        {
            household.OwnerId = HttpContext.User.GetClaim("sub").Value;
            await Context.Households.AddAsync(household);
            await Context.SaveChangesAsync();
            return household;
        }
    }
}
