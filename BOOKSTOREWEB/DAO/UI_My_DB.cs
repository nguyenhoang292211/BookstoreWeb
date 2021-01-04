using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Windows;

namespace BOOKSTOREWEB.DAO
{
    public class UI_My_DB : IDisposable
    {
        public void Dispose()
        {

        }

        string ConnStr = @"Data Source=DESKTOP-VQRDFSM;Initial Catalog=BOOKSTOREWEB;Integrated Security=True;TransparentNetworkIPResolution=False";
        SqlConnection conn = null;
        SqlCommand comm = null;
        SqlDataAdapter da = null;
        public UI_My_DB()
        {
            conn = new SqlConnection(ConnStr);
            comm = conn.CreateCommand();
        }
        public DataTable ExecuteQueryDataSet(string strSQL, CommandType ct)
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
            conn.Open();
            comm.CommandText = strSQL;
            comm.CommandType = ct;
            da = new SqlDataAdapter(comm);
            DataTable ds = new DataTable();
            da.Fill(ds);
            return ds;
        }
        //Thao:
        //Add 1 function to call Funtion in sql server
        public DataTable ExecuteQueryDataSet(string strSQL, CommandType ct, List<SqlParameter> para)
        {
            if (conn.State == ConnectionState.Open)
                conn.Close();
            conn.Open();
            comm.CommandText = strSQL;
            comm.CommandType = ct;
            comm.Parameters.Clear();
            foreach (SqlParameter iParamater in para)
                comm.Parameters.Add(iParamater);

            da = new SqlDataAdapter(comm);
            //   da = comm.ExecuteQ
            DataTable ds = new DataTable();
            da.Fill(ds);



            return ds;
        }
        //End function to call in sql server



        public bool MyExecuteNonQuery(string strSQL, CommandType ct, List<SqlParameter> param)
        {
            bool f = false;
            if (conn.State == ConnectionState.Open)
                conn.Close();
            conn.Open();
            comm.Parameters.Clear();
            comm.CommandText = strSQL;
            comm.CommandType = ct;
            foreach (SqlParameter p in param)
                comm.Parameters.Add(p);
            try
            {
                comm.ExecuteNonQuery();
                f = true;
            }
                catch (SqlException ex)
            {
            }

            finally
            {
                conn.Close();
            }

            return f;
        }




        /// <summary>
        /// Đưa vào một list các biến và chuỗi các @bien tạo thanh list <sqlparameter>
        /// </summary>
        /// <param name="array"></param>
        /// <param name="vars"></param>
        /// <returns></returns>
        public List<SqlParameter> turntoListParam(ArrayList array, string[] vars)
        {
            List<SqlParameter> list = new List<SqlParameter>();

            for (int i = 0; i < vars.Length; i++)
            {
                SqlParameter parameter = new SqlParameter(vars[i], array[i]);
                list.Add(parameter);
            }

            return list;
        }

    }
}