using System;
using System.Text;

namespace RecipeBook.ServiceLibrary.Entities
{
    public class UserEntity
    {
        public string Username { get; set; }
        public string HashedPassword { get; set; }
    }
}
