using System.ComponentModel.DataAnnotations.Schema;
using API.Models;


namespace API.DTOs
{
    public class CartDTO
    {
        public int CartId { get; set; }
        public string CustomerID { get; set; }
        public List<CartItemDTO> Items { get; set; } = new List<CartItemDTO>();
    }
}