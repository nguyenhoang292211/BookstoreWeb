using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Comment
    {
        private int iD;
        private int iDProduct;
        private int iDCustomer;
        private int iDShop;
        private DateTime datePosting;
        private string content;
        private int rating;

        public int ID { get => iD; set => iD = value; }
        public int IDProduct { get => iDProduct; set => iDProduct = value; }
        public int IDCustomer { get => iDCustomer; set => iDCustomer = value; }
        public int IDShop { get => iDShop; set => iDShop = value; }
        public DateTime DatePosting { get => datePosting; set => datePosting = value; }
        public string Content { get => content; set => content = value; }
        public int Rating { get => rating; set => rating = value; }

        public Comment()
        {

        }

        public Comment(int id, int idProduct, int idCustomer, int idShop, DateTime datePosting, string content, int rating)
        {
            this.ID = id;
            this.IDProduct = idProduct;
            this.IDCustomer = idCustomer;
            this.iDShop = idShop;
            this.DatePosting = datePosting;
            this.Content = content;
            this.Rating = rating;
        }

        /// <summary>
        /// Chuyển dữ liệu 1 hàng trong datatable thành dữ liệu Comment
        /// </summary>
        /// <param name="row"></param>
        public Comment(DataRow row)
        {
            this.ID = (int)row["id"];
            this.IDProduct = (int)row["idProduct"];
            this.IDCustomer = (int)row["idCustomer"];
            this.iDShop = (int)row["idShop"];
            this.DatePosting = (DateTime)datePosting;
            this.Content = row["content"].ToString();
            this.Rating = (int)row["rating"];
        }
    }
}