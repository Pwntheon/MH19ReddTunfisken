using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Tuna.AuthMiddleware
{
    public class CustomFacebookAuthenticationHandler : AuthenticationHandler<CustomFacebookAuthenticationOptions>
    {
        private static Dictionary<string, FacebookUser> InMemoryUserCache = new Dictionary<string, FacebookUser>();

        public CustomFacebookAuthenticationHandler(
            IOptionsMonitor<CustomFacebookAuthenticationOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {
        }
        protected async override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                //Authorization header not in request
                return AuthenticateResult.NoResult();
            }
            if (!AuthenticationHeaderValue.TryParse(Request.Headers["Authorization"], out AuthenticationHeaderValue headerValue))
            {
                //Invalid Authorization header
                return AuthenticateResult.NoResult();
            }
            if (!"Bearer".Equals(headerValue.Scheme, StringComparison.OrdinalIgnoreCase))
            {
                //Not Basic authentication header
                return AuthenticateResult.NoResult();
            }

            var referenceToken = headerValue.Parameter;

            FacebookUser user;
            // Get cached user if exists
            if (InMemoryUserCache.ContainsKey(referenceToken))
            {
                user = InMemoryUserCache.GetValueOrDefault(referenceToken);
            }

            user = await FacebookGraphService.CheckToken(referenceToken);
            if (user == null)
                return AuthenticateResult.NoResult();

            // If user was found, we create a ticket
            var sub = new Claim("sub", user.UserId);
            var name = new Claim(ClaimTypes.Name, user.Name);
            var identity = new ClaimsIdentity("custom_facebook");
            identity.AddClaim(sub);
            identity.AddClaim(name);
            var cp = new ClaimsPrincipal(identity);
            return AuthenticateResult.Success(new AuthenticationTicket(cp, "custom_facebook"));
        }
    }
}
