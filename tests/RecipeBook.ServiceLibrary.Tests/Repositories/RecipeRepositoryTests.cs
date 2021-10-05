using Microsoft.Extensions.Configuration;
using Moq;
using RecipeBook.ServiceLibrary.Entities;
using RecipeBook.ServiceLibrary.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Xunit;

namespace RecipeBook.ServiceLibrary.Tests.Repositories
{
    public class RecipeRepositoryTests : IClassFixture<DatabaseFixture> { 

        private bool _commitToDatabase = false;
        private readonly DatabaseFixture _databaseFixture;

        public RecipeRepositoryTests(DatabaseFixture databaseFixture)
        {
            _databaseFixture = databaseFixture;
        }

        public RecipeRepository Setup()
        {
            // we mock not the configuration but the section in which connectionstring value is stored
            var configurationSectionMock = new Mock<IConfigurationSection>();


            // we set up a get function that returns our connection string within the mock configuration:
            configurationSectionMock
                .SetupGet(m => m[It.Is<String>(s => s == "MainDatabase")])
                .Returns("Data Source=localhost,5050; Initial Catalog=RecipeBook;User Id=sa;Password=Your_password123;MultipleActiveResultSets=true");

            // and a property within the mock configuration thats named "connection strings" and returns an object with the line above ^
            var configurationMock = new Mock<IConfiguration>();
            configurationMock
                .Setup(a => a.GetSection(It.Is<string>(s => s == "ConnectionStrings")))
                .Returns(configurationSectionMock.Object);

            var recipeRepository = new RecipeRepository(configurationMock.Object, new IngredientRepository(), new InstructionRepository());
            return recipeRepository; 
        }


        //Xunit needs this decoration
        [Fact]
        [Trait("Category","Database")]
        public async Task InsertAsync_Success()
        {
            // triple A unit testing: arrange, act, assert

            // Arrange:
            var recipeRepository = Setup();

            using (var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {

                var recipeId = Guid.NewGuid();

                // Act 
                var rowsAffected = await recipeRepository.InsertAsync(new RecipeEntity()
                {
                    Id = recipeId,
                    Title = "Friend Chicken Unit Test",
                    Description = "Fried Chicken Description",
                    Logo = null,
                    CreatedDate = DateTimeOffset.UtcNow,
                    Ingredients = new List<IngredientEntity>()
                    {
                        new IngredientEntity()
                        {
                            RecipeId = recipeId,
                            OrdinalPosition = 0,
                            Unit = "lbs",
                            Quantity = 1,
                            Ingredient = "Chicken"
                        }
                    },
                    Instructions = new List<InstructionEntity>()
                    {
                        new InstructionEntity()
                        {
                            RecipeId = recipeId,
                            OrdinalPosition = 0,
                            Instruction = "Cook it"
                        }
                    },

                });

                if (_commitToDatabase)
                {
                    scope.Complete();
                }

                // Assert
                // Xunit checks wether or not rowsAffected is equal to 1
                Assert.Equal(3, rowsAffected);
            }
        }


        // this test sets up a recipe repository (with connection string), 
        [Fact]
        [Trait("Category", "Database")]
        public async Task GetAsyncWithId_Success()
        {
            // Arrange
            var recipeRepository = Setup();

            // Act
            // the databasefixture instantializes the data before the test is run, by connecting to the database using a proper connection string etc.
            // we get a recipe with Id = RecipeId1.
            var recipe = await recipeRepository.GetAsync(_databaseFixture.RecipeId1);

            // Assert
            // then we test if the recipe id we got from the _databaseFixture connection matches the one we give it
            // to make sure that our GetAsync works correctly
            Assert.NotNull(recipe);
            Assert.NotNull(recipe.Ingredients);
            Assert.NotNull(recipe.Instructions);
            Assert.Equal(_databaseFixture.RecipeId1, recipe.Id);
        }

        [Fact]
        [Trait("Category", "Databass")]
        public async Task GetAsync_Success()
        {
            // Arrange
            var recipeRepository = Setup();

            // Act
            var recipe = await recipeRepository.GetAsync();

            // Assert
            Assert.NotNull(recipe);
            Assert.Single(recipe);
            Assert.True(recipe.Count() == 1); // does the same thing as above
        }

        [Fact]
        [Trait("Category", "Database")]
        public async Task UpdateAsync_Success()
        {
            var recipeRepository = Setup();

            var recipe = new RecipeEntity()
            {
                Id = _databaseFixture.RecipeId1,
                Title = "Title Something New",
                Description = "Description New",
                Logo = "Something",
                Ingredients = new List<IngredientEntity>()
                {
                    new IngredientEntity()
                    {
                        RecipeId = _databaseFixture.RecipeId1,
                        OrdinalPosition = 0,
                        Unit = "lbs",
                        Quantity = 1,
                        Ingredient = "Chicken"
                    },
                    new IngredientEntity()
                    {
                        RecipeId = _databaseFixture.RecipeId1,
                        OrdinalPosition = 1,
                        Unit = "lbs",
                        Quantity = 2,
                        Ingredient = "Oil"
                    }
                },
                Instructions = null,
                CreatedDate = DateTimeOffset.UtcNow
            };

            var rowsAffected = await recipeRepository.UpdateAsync(recipe);

            Assert.Equal(3, rowsAffected);
        }

        [Fact]
        [Trait("Category","Database")]
        public async Task DeleteAsync_Success()
        {
            // Arrange
            var recipeRepository = Setup();

            // Act
            var rowsAffected = await recipeRepository.DeleteAsync(_databaseFixture.RecipeId1);

            // Assert
            Assert.Equal(3, rowsAffected);
        }
    }
}
