using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;
using System.Text;

namespace RecipeBook.ServiceLibrary.Domains
{

    class ImageUpload
    {
        public static Cloudinary cloudinary;

        public const string CLOUD_NAME = "cloud_name";
        public const string API_KEY = "api_key";
        public const string API_SECRET = "api_secret";

        public ImageUpload()
        {
            Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
            cloudinary = new Cloudinary(account);
        }

        public static async void uploadImage(string imagePath)
        {
            try
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(imagePath)
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                Console.WriteLine("[Image was uploaded successfully]");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }

}
