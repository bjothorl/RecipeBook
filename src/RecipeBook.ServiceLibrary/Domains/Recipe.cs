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
        public readonly CloudinaryImageStorage _imageUpload;

        // constructor for Recipe, takes configuration and instantiates a new RecipeRepository
        public Recipe(IConfiguration configuration)
        {
            _recipeRepository = new RecipeRepository(configuration, new IngredientRepository(), new InstructionRepository());
            _imageUpload = new CloudinaryImageStorage(configuration);
        }

        public async Task<RecipeEntity> GetRecipe(Guid id)
        {
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
            ImageUploadReponse imageResponse = null;

            // alternatively we can store the data (base64) directly in the database, instead of in cloudinary
            try {
                // 1. tries to upload image
                imageResponse = await _imageUpload.UploadImage(recipe.Logo);
                recipe.Logo = imageResponse._url;
                recipe.LogoId = imageResponse._publicId;
                // 2. if successful save to database with uploaded image url
                var rowsAffected = await _recipeRepository.InsertAsync(recipe);
                return recipe.Id.ToString();
            }
            catch (Exception e)
            {
                // 3. if the image succeeded in uploading, delete it, then throw error
                if (imageResponse._publicId!=null) _imageUpload.DeleteImage(imageResponse._publicId);
                throw e;
            }
        }

        public async Task<string> DeleteRecipe(Guid id)
        {
            string LogoId = null;
            string deleteResult = null;
            int rowsAffected = 0;
            try
            {
                // get logoid for image deletion
                var recipe = await _recipeRepository.GetAsync(id);
                LogoId = recipe.LogoId;

                // delete data in database
                rowsAffected = await _recipeRepository.DeleteAsync(id);
   
                // delete image in cloudinary
                deleteResult = _imageUpload.DeleteImage(LogoId);

                return id.ToString();
            }
            catch (Exception e)
            {
                // database deletion succeeded, image deletion fail:
                if (rowsAffected != 0 && LogoId !=null && deleteResult==null) _imageUpload.AddToDeletionQueue(LogoId);
                
                // database deletion fail = everything fails, don't delete image
                throw e;
            }
            
        }

        public async Task<string> EditRecipe(RecipeEntity recipe)
        {
            ImageUploadReponse imageResponse = null;
            try
            {
                // get logoid for image comparison
                var databaseRecipe = await _recipeRepository.GetAsync(recipe.Id);

                // update everything but logo, 
                int rowsAffected = await _recipeRepository.UpdateAsync(recipe);

                // if logo changed, upload it and delete old one
                if (recipe.Logo != databaseRecipe.Logo) {
                    imageResponse = await _imageUpload.UploadImage(recipe.Logo);
                    string deleteResult = _imageUpload.DeleteImage(databaseRecipe.LogoId);
                    rowsAffected += await _recipeRepository.UpdateLogo(recipe.Id, imageResponse._url, imageResponse._publicId);
                }

                return recipe.Id.ToString();
            }
            catch (Exception e)
            {
                if (imageResponse != null) _imageUpload.DeleteImage(recipe.LogoId);
                throw e;
            }
            
        }

    }
}
