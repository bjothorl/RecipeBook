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
        private readonly RecipeRepository _recipeRepository;

        public RecipeController(IConfiguration configuration)
        {
            // the configuration dependency injection is automatically defaulted to appsettings.json 
            _recipeRepository = new RecipeRepository(configuration, new IngredientRepository(), new InstructionRepository());

        }

        [HttpPost] // api/recipe
        public async Task<IActionResult> PostAsync([FromBody] RecipeEntity recipe)
        {
            var rowsAffected = await _recipeRepository.InsertAsync(recipe);
            return Ok(recipe.Id + " inserted! rowsAffected = " + rowsAffected + "!");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOnceAsync()
        {
            var recipeList = await _recipeRepository.GetAsync();
            return Ok(recipeList);
        }

        [HttpGet("{recipeId}")] // GET api/recipe/{recipeId}
        public async Task<IActionResult> GetOnceAsync([FromRoute] Guid recipeId)
        {
            var recipe = await _recipeRepository.GetAsync(recipeId);
            return Ok(recipe);
        }

        [HttpGet("list")] // GET api/recipe?pageSize=10&pageNumber=1
        public IActionResult GetList([FromQuery] int pageSize, [FromQuery] int pageNumber)
        {
            return Ok(pageSize + " " + pageNumber);
        }

        [HttpPut] // PUT api/recipe/
        public async Task<IActionResult> PutAsync([FromBody] RecipeEntity recipe)
        {
            // posts recipe, but if recipe exists, we modify current one
            try
            {
                var rowsAffected = await _recipeRepository.InsertAsync(recipe);
                return Ok(recipe.Id + " inserted! rowsAffected = " + rowsAffected);
            }
            catch (Exception)
            {
                var rowsAffected = await _recipeRepository.UpdateAsync(recipe);
                return Ok(recipe.Id + " updated! rowsAffected = " + rowsAffected);
            }

            //return Ok(recipe);
        }

        [HttpDelete("{recipeId}")] // DELETE api/recipe/{recipeId}
        public async Task<IActionResult> DeleteAsync([FromRoute] Guid recipeId)
        {
            var rowsAffected = await _recipeRepository.DeleteAsync(recipeId);

            return Ok(recipeId + " deleted! rows affected: " + rowsAffected);
        }
    }
}
