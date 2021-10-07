using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecipeBook.ServiceLibrary.Models;
using RecipeBook.ServiceLibrary.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipeBook.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService _userService;

        public UserController(IConfiguration configuration)
        {
            _userService = new UserService(configuration);
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateRequest model)
        {
            try
            {
                var response = await _userService.Authenticate(model);

                if (response == null) return BadRequest(new { message = "Username or Password incorrect." });
                return Ok(response);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest model)
        {
            try
            {
                var response = await _userService.RegisterUser(model);

                if (response == null)
                    return BadRequest(new { message = "Something went wrong." });

                return Ok(response.Username);
            } catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

    }
}
