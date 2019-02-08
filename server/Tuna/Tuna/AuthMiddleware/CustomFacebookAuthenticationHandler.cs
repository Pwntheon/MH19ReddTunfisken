using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Concurrent;
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
        private static ConcurrentDictionary<string, FacebookUser> InMemoryUserCache = new ConcurrentDictionary<string, FacebookUser>();

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
                //Not bearer token authentication header
                return AuthenticateResult.NoResult();
            }

            var referenceToken = headerValue.Parameter;

            // Get cached user if exists
            if (!InMemoryUserCache.TryGetValue(referenceToken, out FacebookUser user))
            {
                user = await FacebookGraphService.GetUserInfoFromReferenceToken(referenceToken);
                var didAddUserToCache = InMemoryUserCache.TryAdd(referenceToken, user);

                // Log error if we failed to cache user data
                if (!didAddUserToCache)
                {
                    var client = new TelemetryClient();
                    var telemetryProperties = new Dictionary<string, string> { { "Token", referenceToken }, { "Name", user.Name } };
                    InMemoryUserCache.ToList().ForEach(x => telemetryProperties.Add("CACHED: " + x.Value.Name, x.Key));
                    client.TrackEvent("Cannot add user to dictionary", telemetryProperties);
                    throw new Exception("Cannot add to dictionary");
                }
            }

            // NoResult if token didn't result in any user info from graph API
            if (user == null)
                return AuthenticateResult.NoResult();

            // If user was found, we create a ticket containing user info form graph as claims
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
