using System.Text.Json;
using API.Data;
using API.Extensions;
using API.models;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly StoreContext _db;

        public ProductController(StoreContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> 
        GetProducts([FromQuery]ProductParams ProductParams)
        {
            var query = _db.Products
                        .Sort(ProductParams.OrderBy)
                        .Search(ProductParams.KeyWord)
                        .Filter(ProductParams.Type)
                        .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, ProductParams.PageNumber, ProductParams.PageSize);
            
            Response.AddPaginationHeader(products.MetaData);
            return products;
        }

        [HttpGet("{id}")] // api/Products/3
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            Product product = await _db.Products.FindAsync(id);

            if (product == null) return NotFound();

            return Ok(product);
        }

        [HttpGet("filters")]
        public async Task<ActionResult> GetTypeofProduct()
        {
            var types = await _db.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new {types});
        }
    }
}