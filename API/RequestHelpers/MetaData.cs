using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    //class này hiển thị trong headers khi gọi API

    public class MetaData
    {
        //page hiện tại
        public int CurPage {get; set;}

        //tổng số page
        public int TotalPage {get; set;}

        //số lượng sản phẩm mỗi page
        public int PageSize {get; set;}

        //Tổng sản phẩm
        public int TotalCount {get; set;}

    }
}