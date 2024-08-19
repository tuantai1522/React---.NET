using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Extensions
{
    public static class ProductsExtension
    {

        public static IQueryable<Product> Sort(this IQueryable<Product> query,
                                                string OrderBy)
        {
            if (string.IsNullOrWhiteSpace(OrderBy)) return query.OrderBy(p => p.ProductName);

            query = OrderBy switch
            {
                "priceAsc" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.ProductName)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query,
                                                string KeyWord)
        {
            if(string.IsNullOrEmpty(KeyWord)) return query;

            //Chuẩn hóa chuỗi
            string lowerCaseSearchKeyWord = KeyWord.Trim().ToLower();

            query = query.Where(p => p.ProductName.ToLower().Contains(lowerCaseSearchKeyWord));

            return query;
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string type)
        {
            var typeList = new List<string>();

            if (!string.IsNullOrEmpty(type))
                typeList.AddRange(type.ToLower().Split(",").ToList());

            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));

            return query;
        }
    }
}