using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class My_DB
    {
        public static string severName = "DESKTOP-PU63SO7";
        public static string dataName = "BOOKSTOREWEB";
        private static My_DB instance;
        public static My_DB Instance
        {
            get
            {
                if (instance == null)
                    instance = new My_DB();
                return instance;
            }
            private set { instance = value; }
        }

        private My_DB() { }

        private static string strconn = @"Data Source=" + severName + ";Initial Catalog=" + dataName + ";Integrated Security=True";

        private SqlConnection con = new SqlConnection(strconn);

        public SqlConnection getConnection
        {
            get { return con; }
        }

        public void openConnection()
        {
            if ((con.State == ConnectionState.Closed))
            {
                con.Open();
            }
        }

        public void closeConnection()
        {
            if ((con.State == ConnectionState.Open))
            {
                con.Close();
            }
        }
    }
}