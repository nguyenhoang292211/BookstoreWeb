using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class VoucherDAO
    {
        private static VoucherDAO instance;
        public static VoucherDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new VoucherDAO();
                return instance;
            }
            private set { instance = value; }
        }

        private VoucherDAO()
        {

        }

        
    }
}