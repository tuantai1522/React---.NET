using System.ComponentModel.DataAnnotations.Schema;
using API.models;

namespace API.Models
{
    [Table("CartItems")]

    public class CartItem
    {
        public int CartItemId { get; set; }
        public int Quantity { get; set; }


        //Relationship
        public int ProductId { get; set; }
        public Product product { get; set; }

        public int CartId { get; set; }
        public Cart Cart { get; set; }
    }
}