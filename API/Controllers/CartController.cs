using API.Models;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.models;
using API.DTOs;
namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly StoreContext _db;

        public CartController(StoreContext db)
        {
            _db = db;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            //get product and all cart items in this cart
            var cart = await RetrieveCart();

            if (cart == null) return NotFound();

            return RetrieveCartDTOFromCart(cart);
        }



        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)
        {
            //Kiểm tra xem cart có tồn tại hay chưa
            Cart cart = await RetrieveCart();

            if (cart == null) //chưa tạo cart
                cart = CreateCart();

            //Tìm kiếm sản phẩm cần thêm
            Product product = await RetrieveProduct(productId);

            if (product == null) return NotFound();

            cart.AddProductIntoCart(product, quantity);

            var result = await _db.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", RetrieveCartDTOFromCart(cart));

            return BadRequest(new ProblemDetails { Title = "Problems saving item to cart" });
        }
        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            //Kiểm tra xem cart có tồn tại hay chưa
            Cart cart = await RetrieveCart();
            if (cart == null) return NotFound();

            //Tìm kiếm sản phẩm cần xóa
            Product product = await RetrieveProduct(productId);
            if (product == null) return NotFound();

            cart.RemoveItem(productId, quantity);

            var result = await _db.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", RetrieveCartDTOFromCart(cart));

            return BadRequest(new ProblemDetails { Title = "Problems deleting item in cart" });
        }

        private async Task<Cart> RetrieveCart()
        {
            string customerId = Request.Cookies["customerId"];

            return await _db.Carts
                .Include(i => i.Items)
                .ThenInclude(p => p.product) // Assuming 'Product' is the correct property name
                .FirstOrDefaultAsync(x => x.CustomerID == customerId);

        }

        private async Task<Product> RetrieveProduct(int productId)
        {
            Product product = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == productId);
            return product;
        }

        private Cart CreateCart()
        {
            //to create random customerId
            string customerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30),
            };
            //add into cookies
            Response.Cookies.Append("customerId", customerId, cookieOptions);

            var cart = new Cart { CustomerID = customerId };
            _db.Carts.Add(cart);
            return cart;
        }

        private CartDTO RetrieveCartDTOFromCart(Cart cart)
        {
            return new CartDTO
            {
                CartId = cart.CartId,
                CustomerID = cart.CustomerID,
                Items = cart.Items.Select(item => new CartItemDTO
                {
                    ProductId = item.product.ProductId,
                    ProductName = item.product.ProductName,
                    Price = item.product.Price,
                    Type = item.product.Type,
                    Quantity = item.Quantity,
                    PictureUrl = item.product.PictureUrl,
                }).ToList(),
            };
        }
    }
}