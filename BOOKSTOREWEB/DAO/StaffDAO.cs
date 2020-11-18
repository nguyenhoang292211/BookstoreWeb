using BOOKSTOREWEB.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class StaffDAO
    {
        private static StaffDAO instance;
        public static StaffDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new StaffDAO();
                return instance;
            }
            private set { instance = value; }
        }

        private StaffDAO()
        {

        }

        public Staff GetStaffByIDAccount(int id)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("SELECT * FROM Staff WHERE idAccount = @id", new object[] { id });
            if (data.Rows.Count > 0)
                return new Staff(data.Rows[0]);
            return null;
        }

        public DataTable GetListTransport()
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetListTransport");
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        public DataTable GetListTransportByState(string state)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetListTransportByState @state", new object[] { state });
            if (data.Rows.Count > 0)
                return data;
            return null;
        }
    }
}