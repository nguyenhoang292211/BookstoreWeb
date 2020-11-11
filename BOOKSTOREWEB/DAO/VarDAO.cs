using BOOKSTOREWEB.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class VarDAO
    {
        private static VarDAO instance;
        public static VarDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new VarDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public Customer customer;
        public Staff staff;
        private VarDAO()
        {
            customer = new Customer();
            staff = new Staff();
        }

        
    }
}