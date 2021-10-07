using Dapper;
using Microsoft.Extensions.Configuration;
using RecipeBook.ServiceLibrary.Entities;
using RecipeBook.ServiceLibrary.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeBook.ServiceLibrary.Repositories
{
    public interface IUserRepository
    {
        Task<int> InsertAsync(UserEntity user);
    }

    public class UserRepository : IUserRepository
    {
        // connect to database, get / store encrypted passwords, etc
        private readonly string _connectionString;
        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MainDatabase");
        }

        public async Task<int> InsertAsync(UserEntity entity)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var transaction = await connection.BeginTransactionAsync())
                {

                    var rowsAffected = await connection.ExecuteAsync(@"
                    INSERT INTO [dbo].[Users]
                                ([Username]
                                ,[HashedPassword])
                            VALUES
                                (@Username
                                ,@HashedPassword)",
                            new
                            {
                                entity.Username,
                                entity.HashedPassword,
                            }, transaction: transaction);

                    transaction.Commit();

                    return rowsAffected;

                }

            }
        }

        public async Task<UserEntity> GetAsync(string Username)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                using (var reader = await connection.QueryMultipleAsync(@"
                                    SELECT *
                                    FROM [Users]
                                    WHERE [Username] = @Username",
                    new
                    {
                        Username
                    }))
                {
                    var user = await reader.ReadSingleAsync<UserEntity>();

                    return user;
                }
            }
        }
    }
}
