using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Tuna.AuthMiddleware
{
    public static class FacebookGraphService
    {
        public static async Task<FacebookUser> GetUserInfoFromReferenceToken(string token)
        {
            try
            {
                var c = new HttpClient();
                var url = "https://graph.facebook.com/me?access_token=" + token;
                var res = await c.GetAsync(url);
                if (res.IsSuccessStatusCode)
                {
                    var user = JsonConvert.DeserializeObject<FacebookUser>(await res.Content.ReadAsStringAsync());
                    return user;
                }
                // Return null if user is not found
                return null;
            }
            catch
            {
                return null;
            }
        }
    }
}
