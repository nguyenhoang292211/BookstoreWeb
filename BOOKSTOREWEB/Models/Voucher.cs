using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Voucher
    {
        private int iD;
        private string name;
        private DateTime startDate;
        private DateTime endDate;
        private string detail;
        private float discount;

        public int ID { get => iD; set => iD = value; }
        public string Name { get => name; set => name = value; }
        public DateTime StartDate { get => startDate; set => startDate = value; }
        public DateTime EndDate { get => endDate; set => endDate = value; }
        public string Detail { get => detail; set => detail = value; }
        public float Discount { get => discount; set => discount = value; }

        public Voucher()
        {

        }

        public Voucher(int id, string name, DateTime startDate, DateTime endDate, string detail, float discount)
        {
            this.ID = id;
            this.Name = name;
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.Detail = detail;
            this.Discount = discount;
        }

        /// <summary>
        /// Chuyển dữ liệu từ 1 hàng trong datatable thành dữ liệu Voucher.
        /// </summary>
        /// <param name="row"></param>
        public Voucher(DataRow row)
        {
            this.ID = (int)row["id"];
            this.Name = row["name"].ToString();
            this.StartDate = (DateTime)row["startDate"];
            this.EndDate = (DateTime)row["endDate"];
            this.Detail = row["detail"].ToString();
            this.Discount = (float)Convert.ToDouble(row["discount"].ToString());
        }
    }
}