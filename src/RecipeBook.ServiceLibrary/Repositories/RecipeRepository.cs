using Dapper;
using Microsoft.Extensions.Configuration;
using RecipeBook.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeBook.ServiceLibrary.Repositories
{
    public interface IRecipeRepository
    {
        Task<RecipeEntity> GetAsync(Guid id);
        Task<IEnumerable<RecipeEntity>> GetAsync();
        Task<int> InsertAsync(RecipeEntity entity);
        Task<int> DeleteAsync(Guid id);
        Task<int> UpdateAsync(RecipeEntity entity);
    }
    public class RecipeRepository: IRecipeRepository
    {
        private readonly string _connectionString;
        private readonly IIngredientRepository _ingredientRepository;
        private readonly IInstructionRepository _instructionRepository;

        public RecipeRepository(IConfiguration configuration, IIngredientRepository ingredientRepository, IInstructionRepository instructionRepository)
        {
            _connectionString = configuration.GetConnectionString("MainDatabase");
            _ingredientRepository = ingredientRepository;
            _instructionRepository = instructionRepository;
        }

        public async Task<RecipeEntity> GetAsync(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var reader = await connection.QueryMultipleAsync(@"
                                    SELECT *
                                    FROM [Recipes]
                                    WHERE [Id] = @RecipeId
                                    
                                    SELECT *
                                    FROM [Ingredients]
                                    WHERE [RecipeId] = @RecipeId

                                    SELECT *
                                    FROM [Instructions]
                                    WHERE [RecipeId] = @RecipeId",
                    new
                    {
                        RecipeId = id
                    }))
                {
                    var recipe = await reader.ReadSingleAsync<RecipeEntity>();
                    recipe.Ingredients = (await reader.ReadAsync<IngredientEntity>())?.ToList();
                    recipe.Instructions = (await reader.ReadAsync<InstructionEntity>())?.ToList();
                    return recipe;
                }
            }
        }

        public async Task<IEnumerable<RecipeEntity>> GetAsync()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var result = await connection.QueryAsync<RecipeEntity>(@"
				            SELECT *
				            FROM [Recipes]"
                    );
                return result;
            }
        }

        public async Task<int> InsertAsync(RecipeEntity entity)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var transaction = await connection.BeginTransactionAsync())
                {

                    var rowsAffected = await connection.ExecuteAsync(@"
                    INSERT INTO [dbo].[Recipes]
                                ([Id]
                                ,[Title]
                                ,[Description]
                                ,[Logo]
                                ,[LogoId]
                                ,[CreatedDate])
                            VALUES
                                (@Id
                                ,@Title
                                ,@Description
                                ,@Logo
                                ,@LogoId
                                ,@CreatedDate)",
                            new
                            {
                                entity.Id,
                                entity.Title,
                                entity.Description,
                                entity.Logo,
                                entity.LogoId,
                                CreatedDate = DateTimeOffset.UtcNow
                            }, transaction: transaction);

                    rowsAffected += await _ingredientRepository.InsertAsync(connection, transaction, entity.Ingredients);
                    rowsAffected += await _instructionRepository.InsertAsync(connection, transaction, entity.Instructions);

                    transaction.Commit();
                    
                    return rowsAffected;

                }

            }
        }

        public async Task<int> UpdateAsync(RecipeEntity entity)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var transaction = connection.BeginTransaction())
                {
                    var rowsAffected = await connection.ExecuteAsync(@"
                        UPDATE [dbo].[Recipes]
					        SET [Title] = @Title
						        ,[Description] = @Description
					        WHERE [Id] = @Id",
                            new
                            {
                                entity.Id,
                                entity.Title,
                                entity.Description,
                            }, transaction: transaction);

                    await _ingredientRepository.DeleteAsync(connection, transaction, entity.Id);
                    rowsAffected += await _ingredientRepository.InsertAsync(connection, transaction, entity.Ingredients);

                    await _instructionRepository.DeleteAsync(connection, transaction, entity.Id);
                    rowsAffected += await _instructionRepository.InsertAsync(connection, transaction, entity.Instructions);

                    transaction.Commit();

                    return rowsAffected;
                }
            }
        }
        public async Task<int> UpdateLogo(Guid Id, string Logo, string LogoId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var transaction = connection.BeginTransaction())
                {
                    var rowsAffected = await connection.ExecuteAsync(@"
                        UPDATE [dbo].[Recipes]
					        SET [Logo] = @Logo
                                ,[LogoId] = @LogoId
					        WHERE [Id] = @Id",
                            new
                            {
                                Id,
                                Logo,
                                LogoId,
                            }, transaction: transaction);

                    transaction.Commit();

                    return rowsAffected;
                }
            }
        }

        public async Task<int> DeleteAsync(Guid id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var rowsAffected = 0;
                await connection.OpenAsync();
                using (var transaction = await connection.BeginTransactionAsync())
                {
                    // we need to delete intructions and ingredients before the recipe, because of constraints
                    rowsAffected += await _instructionRepository.DeleteAsync(connection, transaction, id);
                    rowsAffected += await _ingredientRepository.DeleteAsync(connection, transaction, id);

                    rowsAffected += await connection.ExecuteAsync(@"
                            DELETE FROM [dbo].[Recipes]
                            WHERE [Id] = @Id",
                        new
                        {
                            Id = id,
                        },
                        transaction: transaction);

                    transaction.Commit();

                    return rowsAffected;
                }
            }
        }
    }
}
