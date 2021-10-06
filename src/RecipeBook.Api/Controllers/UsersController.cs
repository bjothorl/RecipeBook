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
    public class UsersController : ControllerBase
    {
        private UserService _userService;

        public UsersController(IConfiguration configuration)
        {
            _userService = new UserService(configuration);
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }


        [Authorize]
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
