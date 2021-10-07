using RecipeBook.ServiceLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RecipeBook.ServiceLibrary.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(UserEntity user, string token)
        {
            Id = user.Id;
            Username = user.Username;
            Token = token;
        }
    }
}
