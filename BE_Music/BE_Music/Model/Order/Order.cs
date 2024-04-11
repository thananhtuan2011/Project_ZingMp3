using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Clothes_Shop.Model.Order
{
    public class Order
    {
        public int account_id { get; set; }
        public int product_id { get; set; }
        public int category_id { get; set; }
        public int soluong { get; set; }
        
                  public string product_name { get; set; }
        public string Img { get; set; }
        public string address { get; set; }
        public string color { get; set; }
        public string phone { get; set; }
        public bool pay { get; set; }
        
        public string Size { get; set; }
        public string full_name { get; set; }
        public int DonGia { get; set; }
        
    }
}
