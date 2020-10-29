using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectWeb.DAO
{
    public class AccountDAO
    {
        private static AccountDAO instance;

        public static AccountDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new AccountDAO();
                return instance;
            }
            private set { instance = value; }
        }

        private AccountDAO()
        {

        }
    }
}