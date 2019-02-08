using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tuna.Helpers;
using Tuna.Mocks;
using Tuna.Models;
using Tuna.Services;

namespace Tuna.Controllers
{
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private TunaContext Context;
        private WasteCollectionService CollectionService;
        public CollectionController(TunaContext ctx, WasteCollectionService collectionService)
        {
            Context = ctx;
            CollectionService = collectionService;
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
            collection.HouseholdId = HttpContext.User.GetHouseHoldId(Context);
            return Ok(await CollectionService.RegisterWasteCollectionAsync(collection));
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
            return Ok(await CollectionService.RegisterWasteCollectionAsync(collection));
        }
        
    }
}
