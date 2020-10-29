using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectWeb.DAO
{
    public class PermissionDAO
    {
        private static PermissionDAO instance;
        public static PermissionDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new PermissionDAO();
                return instance;
            }
            private set { instance = value; }
        }

        private PermissionDAO()
        {

        }
    }
}