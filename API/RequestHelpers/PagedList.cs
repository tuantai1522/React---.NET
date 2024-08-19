using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{

    //can use for any of my entities
    public class PagedList<T> : List<T>
    {
        public MetaData MetaData {get; set;}
        public PagedList(List<T> items, int _Count, int _PageNumber, int _PageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = _Count,
                CurPage = _PageNumber,
                PageSize = _PageSize,
                TotalPage = (int)Math.Ceiling(_Count / _PageSize * 1.0) 
            };
            AddRange(items);
        }

        // Hiển thị số lượng sản phẩm tương ứng
        public static async Task<PagedList<T>> 
        ToPagedList(IQueryable<T> query, 
                    int PageNumber, int PageSize)
        {
            var Count = await query.CountAsync();
            var items = await query
            .Skip((PageNumber - 1) * PageSize)
            .Take(PageSize).ToListAsync();
            return new PagedList<T>(items, Count, PageNumber, PageSize);
        }

    }
}