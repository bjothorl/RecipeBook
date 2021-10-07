using Dapper;
using Microsoft.Extensions.Configuration;
using RecipeBook.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace RecipeBook.ServiceLibrary.Repositories
{
    public class UserRepository
    {
        // connect to database, get / store encrypted passwords, etc
        private readonly string _connectionString;
        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MainDatabase");
        }

        public async Task<int> InsertAsync(UserEntity user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var transaction = await connection.BeginTransactionAsync())
                {

                    var rowsAffected = await connection.ExecuteAsync(@"
                    INSERT INTO [dbo].[Users]
                                ([Id]
                                ,[Username]
                                ,[Password]
                                ,[CreatedDate])
                            VALUES
                                (@Id
                                ,@Username
                                ,@Password
                                ,@CreatedDate)",
                            new
                            {
                                Id = 3,
                                Username = "bob",
                                Password = "hash",
                            }, transaction: transaction);

                    transaction.Commit();

                    return rowsAffected;

                }

            }
        }
    }
}
