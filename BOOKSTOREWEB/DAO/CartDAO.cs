using BOOKSTOREWEB.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class CartDAO
    {
        private static CartDAO instance;
        public static CartDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new CartDAO();
                return instance;
            }
            private set { instance = value; }
        }

        private CartDAO()
        {

        }

        public bool AddCart(Cart cart)
        {
            string query = "InsertCart @idCus , @idProduct , @idShop , @quantity";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] {cart.IDCustomer, cart.IDProduct, cart.IDShop, cart.Quantity });
            return result > 0;
        }

        //Kiểm tra xem giỏ hàng có món hàng này chưa , nếu có trả về số lượng
        public int Checkquantity(int idPro, int idCus)
        {
            string query = "EXEC USP_Checkquantityproduct @idCus , @idProduct";
            DataTable result = DataProvider.Instance.ExecuteQuery(query, new object[] { idCus, idPro });
            int k = Int32.Parse( result.Rows[0][0].ToString());
            return k;
        }


        public bool UpdateCart (int idCus, int idPro, int quantity)
        {
            DataProvider data = new DataProvider();
            string query = "EXEC USP_UpdateCart @idCus , @idPro , @quantity ";
            int result = data.ExecuteNonQuery(query, new object[] { idCus, idPro, quantity });
            return result > 0;
        }


    }
}