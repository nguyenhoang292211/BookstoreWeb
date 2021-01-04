using BOOKSTOREWEB.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
        //Thao Procedure
        //Pro_GUI_Thao: Lấy các sản phẩm trong giỏ hàng của một khách hàng cụ thể
        public DataTable GetCartByIdCus(int idCus)
        {
            DataTable data;
            // DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetListProductByIDCus @idCus ", new object[] { idCus });
            using (UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.ExecuteQueryDataSet("USP_GetListProductByIDCus", CommandType.StoredProcedure, new List<SqlParameter>() { new SqlParameter("@idCus", idCus) });
            }
            if (data.Rows.Count > 0)
                return data;
            return null;
        }
        public DataTable GetListSelectPro(int idCus, int idPro)
        {
            DataTable data;
            using( UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.ExecuteQueryDataSet("USP_getSelectProduct", CommandType.StoredProcedure,
                    new List<SqlParameter>() { new SqlParameter("idCus", idCus), new SqlParameter("idPro", idPro) });
            }
            if (data.Rows.Count > 0)
                return data;
            return null;
        }
        //Pro_GUI_Thao: Lấy thông tin giao hàng của một khách hàng
        public DataTable GetInfoCustomer(int idCus)
        {
            //  DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetInfoCustomer @idCus ", new object[] { idCus });
            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.ExecuteQueryDataSet("USP_GetInfoCustomer", CommandType.StoredProcedure, new List<SqlParameter>() { new SqlParameter("@idCus", idCus) });
            }
            if (data.Rows.Count > 0)
                return data;
            return null;
        }
       

        public bool SaveComment(Comment comt)
        {

            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                List<SqlParameter> para = mydb.turntoListParam(new ArrayList() { comt.IDCustomer, comt.IDProduct, comt.IDShop, comt.Content, comt.Rating }, new string[] { "@idCus", "@idPro", "@idShop", "@content", "@rating" });
                data = mydb.ExecuteQueryDataSet("USP_commentInProduct", CommandType.StoredProcedure, para);
            }
            return true;
        }
        //Pro_GUI_Thao: Cộng (1) sản phẩm khi click Plus button
        public bool PlusAProduct(int idCus, int idPro)
        {

            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                List<SqlParameter> para = mydb.turntoListParam(new ArrayList() { idCus, idPro }, new string[] { "@idCus", "@idPro" });
                data = mydb.ExecuteQueryDataSet("USP_PlusAProduct", CommandType.StoredProcedure, para);
            }
            return true;
        }
        //Pro_GUI_Thao: Trừ (1) sản phẩm khi click Minus button
        public bool MinusAProduct(int idCus, int idPro)
        {

            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                List<SqlParameter> para = mydb.turntoListParam(new ArrayList() { idCus, idPro }, new string[] { "@idCus", "@idPro" });
                data = mydb.ExecuteQueryDataSet("USP_MinusAProduct", CommandType.StoredProcedure, para);
            }
            return true;
        }
        //Pro_GUI_Thao: Xóa sản phẩm ra khỏi giỏ hàng 
        public bool DeleteOutCart(int idCus, int idPro)
        {
            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                List<SqlParameter> para = mydb.turntoListParam(new ArrayList() { idCus, idPro }, new string[] { "@idCus", "@idPro" });
                data = mydb.ExecuteQueryDataSet("USP_DeleteProductCart", CommandType.StoredProcedure, para);
            }
            return true;
        }
        //Pro_GUI_Thao: Lấy fee ship của đơn vị vận chuyển được chọn
        public DataTable GetFeeShip(int idDel)
        {

            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {

                data = mydb.ExecuteQueryDataSet("USP_GetFeeShipping", CommandType.StoredProcedure, new List<SqlParameter>() { new SqlParameter("@idDel", idDel) });
            }
            return data;
        }


       

    }
}