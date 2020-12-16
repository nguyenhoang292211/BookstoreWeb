using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using BOOKSTOREWEB.Models;
using System.Data.SqlClient;
using System.Collections;

namespace BOOKSTOREWEB.DAO
{
    public class ProductDAO
    {

        private static ProductDAO instance;
        public static ProductDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new ProductDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public ProductDAO()
        {
        }


        /// <summary>
        /// Lấy ra tất cả Sản phẩm và thông tin sản phẩm. 
        /// </summary>
        /// <returns>List<Account>Danh sách Accounts</returns>
        public List<Product> GetListProducts()
        {
            List<Product> products = new List<Product>();
            DataTable data = DataProvider.Instance.ExecuteQuery("SELECT * FROM Product");
            foreach (DataRow row in data.Rows)
            {
                Product a = new Product(row);
                products.Add(a);
            }
            return products;
        }

        public DataTable GetProducts()
        {
           DataTable data = DataProvider.Instance.ExecuteQuery("SELECT * FROM Product");
            if (data.Rows.Count > 0)
                return data;
            return null;
        }
        /// <summary>
        /// Lấy sách theo tên loại sách
        /// </summary>
        /// <param name="nameType"></param>
        /// <returns></returns>
        public DataTable GetProductWithType (string nameType)
        {
            Types type = new Types();
            
            DataTable data = DataProvider.Instance.ExecuteQuery("SELECT * FROM Types WHERE name = @nameType", new object[] {nameType});
            if (data.Rows.Count > 0)
              type =new Types (data.Rows[0]);

            int idType = type.ID;

            DataTable t = DataProvider.Instance.ExecuteQuery("SELECT * FROM Product where idType = @idType", new object[] { idType} );
            if (t.Rows.Count > 0)
                return t;
            return null;


        }

        public List<Product> GetProductWithType(int idType)
        {

            List<Product> list = new List<Product>();
            DataTable t = DataProvider.Instance.ExecuteQuery("SELECT * FROM Product where idType = @idType", new object[] { idType });
            if (t.Rows.Count > 0)
            {
                foreach(DataRow row in t.Rows)
                {
                    Product pro = new Product(row);
                    list.Add(pro);
                }
                return list;
            }
            return null;


        }
        /// <summary>
        /// Lấy danh sách thể loại sách
        /// </summary>
        /// <returns></returns>
        public DataTable GetListTypeProduct()
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("SELECT * FROM Types");
            DataTable datafilter = new DataTable();
            if (data.Rows.Count >= 5)
            {
                for (int i = 0; i < 5; i++)
                {
                    datafilter.Rows.Add(data.Rows[i]);
                }
                return datafilter;
            }
            if(data.Rows.Count>0)
                return data;
            return null;
        }
        /// <summary>
        /// Lấy danh sách tất cả sản phẩm có giảm giá
        /// </summary>
        /// <returns></returns>
        public List<Product> GetListHotdealProduct()
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetListHotdeadProduct");
            List<Product> products = new List<Product>();
            foreach(DataRow row in data.Rows)
            {
                Product pro = new Product(row);
                products.Add(pro);
            }
            return products;
        }

        public List<Product> GetThebestSaler(int top)
        {
            DataProvider a = new DataProvider();
            DataTable data = a.ExecuteQuery("USP_GetBestSaler @top ", new object[] {top });
            List<Product> products = new List<Product>();
            foreach (DataRow row in data.Rows)
            {
                Product pro = new Product(row);
                products.Add(pro);
            }
            return products;
        }

        //Thao procdure
        public DataTable GetListProduct()
        {
            // DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetListProduct");
            DataTable data;

           // using (UI_My_DB mydb = new UI_My_DB())
            {
                DataProvider a = new DataProvider();
                data = a.ExecuteQuery ("USP_GetListProduct ");
            }
            if (data.Rows.Count > 0)
                return data;
            return null;
        }
        public DataTable GetProductByIdCus(int idCus)
        {
            // DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetListProductByIDCus @idCus", new object[] { idCus });
            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.ExecuteQueryDataSet("USP_GetListProductByIDCus", CommandType.StoredProcedure, new List<SqlParameter>() { new SqlParameter("@idCus", idCus) });
            }
            if (data.Rows.Count > 0)
                return data;
            return null;
        }
        public DataTable GetDetailProduct(int idProduct)
        {
            // DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetProductById @idProduct", new object[] { idProduct });
            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.ExecuteQueryDataSet("USP_GetProductById", CommandType.StoredProcedure, new List<SqlParameter>() { new SqlParameter("@idProduct", idProduct) });
            }
            if (data.Rows.Count > 0)
                return data;
            return null;
        }
        //Thao
        public int GetQuantityInCart(int idCus)
        {
            // DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetProductById @idProduct", new object[] { idProduct });
            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.ExecuteQueryDataSet("USP_QuantityInCart", CommandType.StoredProcedure, new List<SqlParameter>() { new SqlParameter("@idCus", idCus) });
            }
            return ((data.Rows.Count > 0) ? Convert.ToInt32(data.Rows[0][0]) : 0);
        }
        public DataTable GetCommentOfProduct(int idProduct)
        {
            //DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetCommenOfProduct @idProduct", new object[] { idProduct });
            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.ExecuteQueryDataSet("USP_GetCommenOfProduct", CommandType.StoredProcedure, new List<SqlParameter>() { new SqlParameter("@idProduct", idProduct) });
            }
            if (data.Rows.Count > 0)
                return data;
            return null;
        }

        public bool SaveComment(Comment comt)
        {
            // int data = DataProvider.Instance.ExecuteNonQuery("USP_commentInProduct @idCus , @idPro , @idShop , @content , @rating ",
            //  new object[] { comt.IDCustomer, comt.IDProduct, comt.IDShop, comt.Content, comt.Rating });
            DataTable data;

            using (UI_My_DB mydb = new UI_My_DB())
            {
                List<SqlParameter> para = mydb.turntoListParam(new ArrayList() { comt.IDCustomer, comt.IDProduct, comt.IDShop, comt.Content, comt.Rating }, new string[] { "@idCus", "@idPro", "@idShop", "@content", "@rating" });
                data = mydb.ExecuteQueryDataSet("USP_commentInProduct", CommandType.StoredProcedure, para);
            }
            return true;
        }
        public bool SaveInCart(int idCus, int idPro, int quantity)
        {
            // DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetProductById @idProduct", new object[] { idProduct });
            bool data;
            //Thao
            using (UI_My_DB mydb = new UI_My_DB())
            {
                data = mydb.MyExecuteNonQuery("USP_AddProductToCart", CommandType.StoredProcedure,
                    new List<SqlParameter>() { new SqlParameter("@idCus", idCus),
                        new SqlParameter("@idPro", idPro), new SqlParameter ("@quantity",quantity)});

            }
            return data;
        }


    }

}
