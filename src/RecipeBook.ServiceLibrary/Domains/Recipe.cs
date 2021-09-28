using Microsoft.Extensions.Configuration;
using RecipeBook.ServiceLibrary.Entities;
using RecipeBook.ServiceLibrary.Repositories;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace RecipeBook.ServiceLibrary.Domains
{
    public interface IRecipe
    {
        public Task<RecipeEntity> GetRecipe(Guid id);
        public Task<IEnumerable<RecipeEntity>> GetRecipes();

        // strings will hold error/success messages
        public Task<string> AddRecipe(RecipeEntity recipe);
        public Task<string> DeleteRecipe(Guid id);
        public Task<string> EditRecipe(RecipeEntity recipe);
    }

    public class Recipe : IRecipe
    {
        // initialize the varible to hold the repository
        private readonly RecipeRepository _recipeRepository;

        // constructor for Recipe, takes configuration and instantiates a new RecipeRepository
        public Recipe(IConfiguration configuration)
        {
            _recipeRepository = new RecipeRepository(configuration, new IngredientRepository(), new InstructionRepository());
        }

        public async Task<RecipeEntity> GetRecipe(Guid id)
        {
            try
            {
                // try to get recipes
            }
            catch (SqlException e)
            {
                // return error ?
            }

            var recipe = await _recipeRepository.GetAsync(id);
            return recipe;

        }

        public async Task<IEnumerable<RecipeEntity>> GetRecipes()
        {
            var recipeList = await _recipeRepository.GetAsync();
            return recipeList;
        }

        public async Task<string> AddRecipe(RecipeEntity recipe)
        {
            var rowsAffected = await _recipeRepository.InsertAsync(recipe);
            return recipe.Id + " inserted! rowsAffected = " + rowsAffected;
        }

        public async Task<string> DeleteRecipe(Guid id)
        {
            var rowsAffected = await _recipeRepository.DeleteAsync(id);
            return id + " deleted! rows affected: " + rowsAffected;
        }

        public async Task<string> EditRecipe(RecipeEntity recipe)
        {
            // posts recipe, but if recipe exists, we modify current one
            try
            {
                var rowsAffected = await _recipeRepository.InsertAsync(recipe);
                return recipe.Id + " inserted! rowsAffected = " + rowsAffected;
            }
            catch (SqlException e)
            {
                var rowsAffected = await _recipeRepository.UpdateAsync(recipe);
                return recipe.Id + " updated! rowsAffected = " + rowsAffected;
            }
        }

    }
}
