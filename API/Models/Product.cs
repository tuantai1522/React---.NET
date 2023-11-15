using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.models
{
    public class Product
    {
        public int ProductId {get; set; }
        public string ProductName {get; set; }
        public string Description {get; set; }
        public double Price {get; set; } // 100.00 => 10000

        public string PictureUrl {get; set; }

        public string Type {get; set; }
        public int QuantityInStock {get; set; }
    }
}