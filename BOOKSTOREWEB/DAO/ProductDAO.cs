using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using BOOKSTOREWEB.Models;

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

    }




}