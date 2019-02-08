using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Tuna.Helpers
{
    public static class ClaimsPrincipalExtensions
    {
        public static Claim GetClaim(this ClaimsPrincipal principal, string claim) {
            return principal.Claims.Where(x => x.Type == "sub").FirstOrDefault();
        }

        public static Guid GetHouseHoldId(this ClaimsPrincipal principal, TunaContext context) {
            return context.Households.Where(x => x.OwnerId == principal.GetClaim("sub").Value).FirstOrDefault().HouseholdId;
        }
    }
}
