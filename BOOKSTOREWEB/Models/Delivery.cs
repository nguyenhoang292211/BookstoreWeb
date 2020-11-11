using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Delivery
    {
        private int iD;
        private string name;
        private float feeShip;

        public int ID { get => iD; set => iD = value; }
        public string Name { get => name; set => name = value; }
        public float FeeShip { get => feeShip; set => feeShip = value; }

        public Delivery()
        {

        }

        public Delivery(int id, string name, float feeShip)
        {
            this.ID = id;
            this.Name = name;
            this.FeeShip = feeShip;
        }

        /// <summary>
        /// Chuyển dữ liệu 1 hàng trong datatable thành dữ liệu Delivery
        /// </summary>
        /// <param name="row"></param>
        public Delivery(DataRow row)
        {
            this.ID = (int)row["id"];
            this.Name = row["name"].ToString();
            this.FeeShip = (float)Convert.ToDouble(row["feeShip"].ToString());
        }
    }
}