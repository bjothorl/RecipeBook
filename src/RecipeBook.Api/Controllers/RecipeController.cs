using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RecipeBook.ServiceLibrary.Domains;
using RecipeBook.ServiceLibrary.Entities;
using RecipeBook.ServiceLibrary.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//https://youtu.be/vplezCfXr7g?list=PLkjH4ckzZcEP_-47R3Di9TsTdBW1K_pDY&t=1207

namespace RecipeBook.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly RecipeService _recipe;

        public RecipeController(IConfiguration configuration)
        {
            // the configuration dependency injection is automatically defaulted to appsettings.json 
            _recipe = new RecipeService(configuration);
        }

        [HttpPost] // api/recipe
        public async Task<IActionResult> PostAsync([FromBody] RecipeEntity recipe)
        {
            try { 
                var result = await _recipe.AddRecipe(recipe);
                return Ok(result);
            }
            catch (Exception e)
            {
                string[] arr = { "ERR", e.Message };
                return Ok(arr);
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllOnceAsync()
        {
            try
            {
                var recipeList = await _recipe.GetRecipes();
                return Ok(recipeList);
            }
            catch (Exception e)
            {
                string[] arr = { "ERR", e.Message };
                return Ok(arr);
            }
        }

        [HttpGet("{recipeId}")] // GET api/recipe/{recipeId}
        public async Task<IActionResult> GetOnceAsync([FromRoute] Guid recipeId)
        {
            try
            {
                var recipe = await _recipe.GetRecipe(recipeId);
                return Ok(recipe);
            }
            catch (Exception e)
            {
                string[] arr = { "ERR", e.Message };
                return Ok(arr);
            }
            
        }

        [HttpGet("list")] // GET api/recipe?pageSize=10&pageNumber=1
        public IActionResult GetList([FromQuery] int pageSize, [FromQuery] int pageNumber)
        {
            return Ok(pageSize + " " + pageNumber);
        }

        [HttpPut] // PUT api/recipe/
        public async Task<IActionResult> PutAsync([FromBody] RecipeEntity recipe)
        {
            try
            {
                var result = await _recipe.EditRecipe(recipe);
                return Ok(result);
            }
            catch (Exception e)
            {
                string[] arr = { "ERR", e.Message };
                return Ok(arr);
            }
            
        }

        [HttpDelete("{recipeId}")] // DELETE api/recipe/{recipeId}
        public async Task<IActionResult> DeleteAsync([FromRoute] Guid recipeId)
        {
            try
            {
                var rowsAffected = await _recipe.DeleteRecipe(recipeId);
                return Ok(recipeId);
            }
            catch (Exception e)
            {
                string[] arr = { "ERR", e.Message };
                return Ok(arr);
            }
        }
    }
}
