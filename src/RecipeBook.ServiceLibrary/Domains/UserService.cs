using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RecipeBook.ServiceLibrary.Entities;
using RecipeBook.ServiceLibrary.Models;
using RecipeBook.ServiceLibrary.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace RecipeBook.ServiceLibrary.Domains
{
    public interface IUserService
    {
        Task<AuthenticateResponse> Authenticate(AuthenticateRequest model);
    }

    public class UserService : IUserService
    {
        private readonly string _jwtSecret;
        private readonly UserRepository _userRepository;

        public UserService(IConfiguration configuration)
        {
            _jwtSecret = configuration.GetSection("JWT")["Secret"];
            _userRepository = new UserRepository(configuration);
        }

        public async Task<UserEntity> RegisterUser(RegisterRequest model)
        {
            UserEntity user = new UserEntity();

            try
            {
                user.Username = model.Username;
                user.HashedPassword = BC.HashPassword(model.Password);
                await _userRepository.InsertAsync(user);

                return user;
            } catch (Exception e)
            {
                throw e;
            }

            
        }

        public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest model)
        {
            try
            {
                // get user and hashed password
                var user = await _userRepository.GetAsync(model.Username);

                // verify password
                if (BC.Verify(model.Password, user.HashedPassword))
                {
                    // authentication successful so generate jwt token
                    var token = generateJwtToken(user);
                    return new AuthenticateResponse(user, token);
                }

                return null;
            } catch (Exception e)
            {
                // if username or password doesnt exist, throws "sequence contains no elements"
                throw e;
            }
        }


        // helper methods
        private string generateJwtToken(UserEntity user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Username) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
