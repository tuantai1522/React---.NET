using API.models;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Carts")]

    public class Cart
    {
        public int CartId { get; set; }
        public string CustomerID { get; set; }
        public List<CartItem> Items { get; set; } = new List<CartItem>();

        public void AddProductIntoCart(Product prod, int quantity)
        {
            var p = Items.FirstOrDefault(item => item.ProductId == prod.ProductId);
            if (p == null) // sản phẩm chưa tồn tại
            {
                Items.Add(new CartItem { product = prod, Quantity = quantity });
            }
            else
            { //sản phẩm đã tồn tại
                p.Quantity += quantity;
            }
        }
        public void RemoveItem(int productID, int quantity)
        {
            var p = Items.FirstOrDefault(item => item.ProductId == productID);

            if (p == null) return;

            // sản phẩm đã tồn tại mới xóa
            p.Quantity -= quantity;

            if (p.Quantity <= 0) Items.Remove(p);
        }
    }
}