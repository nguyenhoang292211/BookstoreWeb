using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class BillDetail
    {
        private int iD;
        private int iDBill;
        private int iDProduct;
        private string state;
        private float prices;
        private int quantity;

        public int ID { get => iD; set => iD = value; }
        public int IDBill { get => iDBill; set => iDBill = value; }
        public int IDProduct { get => iDProduct; set => iDProduct = value; }
        public string State { get => state; set => state = value; }
        public float Prices { get => prices; set => prices = value; }
        public int Quantity { get => quantity; set => quantity = value; }

        public BillDetail()
        {

        }

        public BillDetail(int id, int idBill, int idProduct, string state, float prices, int quantity)
        {
            this.ID = id;
            this.IDBill = idBill;
            this.IDProduct = idProduct;
            this.State = state;
            this.Prices = prices;
            this.Quantity = quantity;
        }

        /// <summary>
        /// Chuyển dữ liệu từ 1 hàng trong datatable thành dữ liệu BillDetail.
        /// </summary>
        /// <param name="row"></param>
        public BillDetail(DataRow row)
        {
            this.ID = (int)row["id"];
            this.IDBill = (int)row["idBill"];
            this.IDProduct = (int)row["idProduct"];
            this.State = row["state"].ToString();
            this.Prices = (float)Convert.ToDouble(row["prices"].ToString());
            this.Quantity = (int)row["quantity"];
        }

    }
}