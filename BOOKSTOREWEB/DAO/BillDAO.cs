using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class BillDAO
    {
        private static BillDAO instance;
        public static BillDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new BillDAO();
                return instance;
            }
            private set { instance = value; }
        }

        private BillDAO()
        {

        }

        public DataTable GetListTransport()
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetListTransport");
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        public DataTable GetListTransportByState(string state)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetListTransportByState @state", new object[] { state });
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        public DataTable GetOrderByIDBill(int idBill)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetOrderByIDBill @idBill", new object[] { idBill });
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        public bool UpdateOrderStateByIdBill(int idBill, string state)
        {
            int result = DataProvider.Instance.ExecuteNonQuery("USP_UpdateOrderStateByIdBill @idBill , @state", new object[] { idBill, state });
            return result > 0;
        }

        public DataTable GetTransportDetailByIDBill(int idBill)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetTransportDetailByIDBill @idBill", new object[] { idBill });
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        public DataTable GetTransportByIDBillAndState(int idBill, string state)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetTransportByIDBillAndState @idBill , @state", new object[] { idBill, state });
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        public DataTable GetOrderFullState()
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetOrderFullState");
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        public DataTable GetCustomerByIDBill(int idBill)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetInfoCustomerByIDBill @idBill", new object[] { idBill });
            if (data.Rows.Count > 0)
                return data;
            return null;    
        }

        public DataTable GetInfoBillByIDBill(int idBill)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetInfoBillByIDBill @idBill", new object[] { idBill });
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        //Pro_GUI_Thao: Lấy các đơn vị vận chuyển 
        public DataTable GetDelivery()
        {
            // DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetDelivery ");
            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.ExecuteQueryDataSet("USP_GetDelivery ", CommandType.StoredProcedure);
            }
            if (data.Rows.Count > 0)
                return data;
            return null;
        }
        
        //Pro_GUI_Thao: Lấy các Khuyến mãi áp dụng -- New Maybe Conflict
        public DataTable GetPromotion()
        {
            // DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetDelivery ");
            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.ExecuteQueryDataSet("USP_getVoucher ", CommandType.StoredProcedure);
            }
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        //Pro_GUI_Thao: Cập nhật đơn hàng thanh toán
        public bool CreateNewBill(int idCus, int idDel, int idPay, int idVou,
                                    string add, string phone, double feeShip, double totalCost)
        {

            using (UI_My_DB mydb = new UI_My_DB())
            {
                List<SqlParameter> para = mydb.turntoListParam(new ArrayList() { idCus, idDel, idPay, idVou, add, phone, feeShip, totalCost },
                    new string[] { "@idCus", "@idDelivery", "@idPayment", "@idVoucher", "@address", "@phone", "@feeShip", "@totalCost" });
                return mydb.MyExecuteNonQuery("USP_create_Bill", CommandType.StoredProcedure, para);    
            }
            //  return result>0;
        }
        //Pro_GUI_Thao: Cập nhật đơn hàng thanh toán__ NewUpdate_ 3/1
        public bool MatchInBillDetail(int idCustomer, int idProduct )
        {

            using (UI_My_DB mydb = new UI_My_DB())
            {
                List<SqlParameter> para = mydb.turntoListParam(new ArrayList() {idCustomer, idProduct  },
                    new string[] { "@idCustomer","@IdProduct" });
                return mydb.MyExecuteNonQuery("USP_MatchInBillDetail", CommandType.StoredProcedure, para);
            }
            //  return result>0;
        }
        

    }
}