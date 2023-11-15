using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class ProductController : ControllerBase
    {
        private readonly StoreContext _db;

        public ProductController(StoreContext db){
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(){
            var products = await _db.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")] // api/Products/3
        public async Task<ActionResult<Product>> GetProduct(int id){
            var product = await _db.Products.FirstOrDefaultAsync(id);
            return Ok(product);
        }
    }
}