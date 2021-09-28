using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RecipeBook.ServiceLibrary.Domains
{
    public class ImageUploadReponse
    {
        
        public string _url { get; set; }
        public string _publicId { get; set; }
        public ImageUploadReponse(string url, string publicId)
        {
            _url = url;
            _publicId = publicId;
        }
    }
    class CloudinaryImageStorage
    {
        public static Cloudinary _cloudinary;
        private readonly string _cloudName;
        private readonly string _apiKey;
        private readonly string _apiSecret;


        public CloudinaryImageStorage(IConfiguration configuration)
        {
            _cloudName = configuration.GetSection("Cloudinary")["cloudName"];
            _apiKey = configuration.GetSection("Cloudinary")["apiKey"];
            _apiSecret = configuration.GetSection("Cloudinary")["apiSecret"];

            Account account = new Account(_cloudName, _apiKey, _apiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public static async Task<ImageUploadReponse> UploadImage(string imagePath)
        {
            try
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(imagePath),
                    Folder = "RecipeBook",
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                ImageUploadReponse response = new ImageUploadReponse(uploadResult.JsonObj["url"].ToString(), uploadResult.JsonObj["public_id"].ToString());

                return response;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public static void DeleteImage(string publicId)
        {
            try {
                var delResParams = new DelResParams()
                {
                    PublicIds = new List<string> { publicId }
                };
                _cloudinary.DeleteResources(delResParams);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }

}
