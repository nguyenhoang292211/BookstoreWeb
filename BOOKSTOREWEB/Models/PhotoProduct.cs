using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class PhotoProduct
    {
        private int iD;
        private int iDProduct;
        private Image photo;

        public int ID { get => iD; set => iD = value; }
        public int IDProduct { get => iDProduct; set => iDProduct = value; }
        public Image Photo { get => photo; set => photo = value; }

        public PhotoProduct()
        {
            
        }

        public PhotoProduct(int id, int idProduct, Image Photo)
        {
            this.ID = id;
            this.IDProduct = idProduct;
            this.Photo = photo;
        }

        /// <summary>
        /// Chuyển dữ liệu 1 hàng trong datatable thành dữ liệu PhotoProduct.
        /// </summary>
        /// <param name="row"></param>
        public PhotoProduct(DataRow row)
        {
            this.ID = (int)row["id"];
            this.IDProduct = (int)row["idProduct"];
            byte[] pic;
            MemoryStream picture;
            if (row["photo"].ToString() != "")
            {
                pic = (byte[])row["photo"];
                picture = new MemoryStream(pic);
                this.Photo = Image.FromStream(picture);
            }
        }
    }
}