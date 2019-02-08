using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tuna.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
#if DEBUG
        [HttpGet]
        [Authorize]
        [Route("/api/user/me")]
        public ActionResult<string> GetCurrentUser()
        {
            var response = "";
            foreach (var c in HttpContext.User.Claims)
            {
                response += c.Type + ":" + c.Value + "<br/>";
            }
            return Ok(response);
        }
#endif
    }
}
