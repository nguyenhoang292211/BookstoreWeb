using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ProjectWeb.Models
{
    public class Permissions
    {
        private int iD;
        private string permission;

        public int ID { get => iD; set => iD = value; }
        public string Permission { get => permission; set => permission = value; }


        public Permissions()
        {

        }

        public Permissions(int id, string permission)
        {
            this.ID = id;
            this.Permission = permission;
        }

        public Permissions(DataRow row)
        {
            this.ID = (int)row["id"];
            this.Permission = row["permission"].ToString(); 
        }
    }
}