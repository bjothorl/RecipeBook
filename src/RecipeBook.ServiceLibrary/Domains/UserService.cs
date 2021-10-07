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

namespace RecipeBook.ServiceLibrary.Domains
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<UserEntity> GetAll();
        UserEntity GetById(int id);
    }

    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production application
        private List<UserEntity> _users = new List<UserEntity>
        {
            new UserEntity { Id = 1, Username = "test", Password = "test" }
        };

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
                user.Id = 3;
                user.Username = model.Username;
                user.Password = generateHash(model.Password);
                await _userRepository.InsertAsync(user);
                return user;
            } catch (Exception e)
            {
                throw e;
            }

            
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

            // return null if user not found
            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<UserEntity> GetAll()
        {
            return _users;
        }

        public UserEntity GetById(int id)
        {
            return _users.FirstOrDefault(x => x.Id == id);
        }

        // helper methods
        private string generateJwtToken(UserEntity user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        private string generateHash(string password)
        {

            return "hash";
        }
    }
}
