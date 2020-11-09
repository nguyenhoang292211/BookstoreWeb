using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Shop
    {
        private int iD;
        private string name;
        private string address;
        private string phone;
        private string email;
        private Image avatar;
        private string info;

        public int ID { get => iD; set => iD = value; }
        public string Name { get => name; set => name = value; }
        public string Address { get => address; set => address = value; }
        public string Phone { get => phone; set => phone = value; }
        public string Email { get => email; set => email = value; }
        public Image Avatar { get => avatar; set => avatar = value; }
        public string Info { get => info; set => info = value; }

        public Shop()
        {

        }

        public Shop(int id, string name, string address, string phone, string email, Image avatar, string info)
        {
            this.ID = id;
            this.Name = name;
            this.Address = address;
            this.Phone = phone;
            this.Email = email;
            this.Avatar = avatar;
            this.Info = info;
        }

        /// <summary>
        /// Chuyển dữ liệu 1 hàng trong datatable thành dữ liệu Shop.
        /// </summary>
        /// <param name="row"></param>
        public Shop(DataRow row)
        {
            this.ID = (int)row["id"];
            this.Name = row["name"].ToString();
            this.Address = row["address"].ToString();
            this.Phone = row["phone"].ToString();
            this.Email = row["email"].ToString();
            byte[] pic;
            MemoryStream picture;
            if (row["avatar"].ToString() != "")
            {
                pic = (byte[])row["avatar"];
                picture = new MemoryStream(pic);
                this.Avatar = Image.FromStream(picture);
            }
            this.Info = row["info"].ToString();
        }
    }
}