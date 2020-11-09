using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Payment
    {
        private int iD;
        private string name;

        public int ID { get => iD; set => iD = value; }
        public string Name { get => name; set => name = value; }

        public Payment()
        {

        }

        public Payment(int id, string name)
        {
            this.ID = id;
            this.Name = name;
        }

        /// <summary>
        /// Chuyển dữ liệu từ 1 hàng trong datatable thành dữ liệu Payment.
        /// </summary>
        /// <param name="row"></param>
        public Payment(DataRow row)
        {
            this.ID = (int)row["id"];
            this.Name = row["name"].ToString();
        }
    }
}