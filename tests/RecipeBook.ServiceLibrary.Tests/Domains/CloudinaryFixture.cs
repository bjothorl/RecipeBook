using System;
using System.Collections.Generic;
using System.Text;

namespace RecipeBook.ServiceLibrary.Tests.Domains
{
    class CloudinaryFixture : IDisposable
    {
        // not sure if needed
        public CloudinaryFixture()
        {
            // upload temporary image to cloudinary
        }
        public void Dispose()
        {
            // delete temporary image
        }
    }
}
