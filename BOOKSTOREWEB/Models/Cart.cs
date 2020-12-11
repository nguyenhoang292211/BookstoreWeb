using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Cart
    {
        private int iDCustomer;
        private int iDProduct;
        private int iDShop;
        private int quantity;


        public int IDCustomer { get => iDCustomer; set => iDCustomer = value; }
        public int IDProduct { get => iDProduct; set => iDProduct = value; }
        public int IDShop { get => iDShop; set => iDShop = value; }
        public int Quantity { get => quantity; set => quantity = value; }

        public Cart()
        {

        }

        public Cart(int idCustomer, int idProduct, int idShop, int quantity)
        {
            this.IDCustomer = idCustomer;
            this.IDProduct = idProduct;
            this.IDShop = idShop;
            this.Quantity = quantity;
        }

        /// <summary>
        /// Chuyển dữ liệu từ 1 hàng trong datatable thành dữ liệu kiểu Cart.
        /// </summary>
        /// <param name="row"></param>
        public Cart(DataRow row)
        {
            this.IDCustomer = (int)row["idCustomer"];
            this.IDProduct = (int)row["idProduct"];
            this.iDShop = (int)row["idShop"];
            this.Quantity = (int)row["quantity"];
        }
    }
}