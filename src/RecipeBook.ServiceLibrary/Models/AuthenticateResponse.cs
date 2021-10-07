using RecipeBook.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RecipeBook.ServiceLibrary.Models
{
    public class AuthenticateResponse
    {
        public string Username { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(UserEntity user, string token)
        {
            Username = user.Username;
            Token = token;
        }
    }
}
