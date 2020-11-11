using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Types
    {
        private int iD;
        private int iDCategory;
        private string name;

        public int ID { get => iD; set => iD = value; }
        public int IDCategory { get => iDCategory; set => iDCategory = value; }
        public string Name { get => name; set => name = value; }

        public Types()
        {

        }

        public Types(int id, int idCategory, string name)
        {
            this.ID = id;
            this.IDCategory = idCategory;
            this.Name = name;
        }


        /// <summary>
        /// Chuyển dữ liệu từ 1 dòng trong datatable thành dữ liệu class Types
        /// </summary>
        /// <param name="row"></param>
        public Types(DataRow row)
        {
            this.ID = (int)row["id"];
            this.IDCategory = (int)row["id"];
            this.Name = row["name"].ToString();
        }
    }
}