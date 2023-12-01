using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CartItemDTO
    {

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; } // 100.00 => 10000
        public string PictureUrl { get; set; }

        public string Type { get; set; }
        public int Quantity { get; set; }
    }
}