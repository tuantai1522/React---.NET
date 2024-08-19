using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    //class này có các thuộc tính của nó và thuộc tính của lớp Pagination Params
    public class ProductParams : PaginationParams
    {
        public string OrderBy {get; set;}
        public string KeyWord {get; set;}
        public string Type {get; set;}
    }
}