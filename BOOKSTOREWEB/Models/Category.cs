using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Category
    {
        private int iD;
        private string name;

        public int ID { get => iD; set => iD = value; }
        public string Name { get => name; set => name = value; }

        public Category()
        {

        }

        public Category(int id, string name)
        {
            this.ID = id;
            this.Name = name;
        }

        /// <summary>
        /// Gán dữ liệu 1 dòng trong DataTable vào class Category.
        /// </summary>
        /// <param name="row"></param>
        public Category(DataRow row)
        {
            this.ID = (int)row["id"];
            this.Name = row["name"].ToString();
        }
    }
}