using Newtonsoft.Json;

namespace Tuna.AuthMiddleware
{
    public class FacebookUser
    {
        [JsonProperty("id")]
        public string UserId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}