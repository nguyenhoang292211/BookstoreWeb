using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Bill
    {
        private int iD;
        private int iDCustomer;
        private int iDDelivery;
        private int iDPayment;
        private int iDVoucher;
        private string addressReceive;
        private string phone;
        private DateTime dateComfirm;
        private DateTime dateReceive;
        private float feeShip;
        private float totalCost;


        public int ID { get => iD; set => iD = value; }
        public int IDCustomer { get => iDCustomer; set => iDCustomer = value; }
        public int IDDelivery { get => iDDelivery; set => iDDelivery = value; }
        public int IDPayment { get => iDPayment; set => iDPayment = value; }
        public int IDVoucher { get => iDVoucher; set => iDVoucher = value; }
        public string AddressReceive { get => addressReceive; set => addressReceive = value; }
        public string Phone { get => phone; set => phone = value; }
        public DateTime DateComfirm { get => dateComfirm; set => dateComfirm = value; }
        public DateTime DateReceive { get => dateReceive; set => dateReceive = value; }
        public float FeeShip { get => feeShip; set => feeShip = value; }
        public float TotalCost { get => totalCost; set => totalCost = value; }

        public Bill()
        {

        }

        public Bill(int id, int idCustomer, int idDelivery, int idPayment, int idVoucher, string addressReceive, string phone,
            DateTime dateComfirm, DateTime dateReceive, float feeShip, float totalCost)
        {
            this.ID = id;
            this.IDCustomer = idCustomer;
            this.IDDelivery = idDelivery;
            this.IDPayment = idPayment;
            this.IDVoucher = idVoucher;
            this.AddressReceive = addressReceive;
            this.Phone = phone;
            this.DateComfirm = dateComfirm;
            this.DateReceive = dateReceive;
            this.FeeShip = feeShip;
            this.TotalCost = totalCost;
        }

        /// <summary>
        /// Chuyển dữ liệu 1 hàng trong datatable thành dữ liệu Bill.
        /// </summary>
        /// <param name="row"></param>
        public Bill(DataRow row)
        {
            this.ID = (int)row["id"];
            this.IDCustomer = (int)row["idCustomer"];
            this.IDDelivery = (int)row["idDelivery"];
            this.IDPayment = (int)row["idPayment"];
            this.IDVoucher = (int)row["idVoucher"];
            this.AddressReceive = row["addressReceive"].ToString();
            this.Phone = row["phone"].ToString();
            this.DateComfirm = (DateTime)row["dateComfirm"];
            this.DateReceive = (DateTime)row["dateReceive"];
            this.FeeShip = (float)Convert.ToDouble(row["feeShip"].ToString());
            this.TotalCost = (float)Convert.ToDouble(row["feeShip"].ToString());
        }
    }
}