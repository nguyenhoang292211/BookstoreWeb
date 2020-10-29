using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Customer
    {
        private int iD;
        private int iDAccount;
        private string name;
        private Image avatar;
        private DateTime birthDay;
        private string address;
        private string phone;
        private string email;

        public int ID { get => iD; set => iD = value; }
        public int IDAccount { get => iDAccount; set => iDAccount = value; }
        public string Name { get => name; set => name = value; }
        public Image Avatar { get => avatar; set => avatar = value; }
        public DateTime BirthDay { get => birthDay; set => birthDay = value; }
        public string Address { get => address; set => address = value; }
        public string Phone { get => phone; set => phone = value; }
        public string Email { get => email; set => email = value; }

        public Customer()
        {

        }

        public Customer(int id, int idAccount, string name, Image avatar, DateTime birthDay, string address, string phone, string email)
        {
            this.ID = id;
            this.IDAccount = idAccount;
            this.Name = name;
            this.Avatar = avatar;
            this.BirthDay = birthDay;
            this.Address = address;
            this.Phone = phone;
            this.Email = email;
        }

        /// <summary>
        /// Chuyển dữ liệu từ 1 hàng trong DataTable thành dữ liệu Customer.
        /// </summary>
        /// <param name="row"></param>
        public Customer(DataRow row)
        {
            this.ID = (int)row["id"];
            this.IDAccount = (int)row["idAccount"];
            this.Name = row["name"].ToString();
            byte[] pic;
            MemoryStream picture;
            if (row["avatar"].ToString() != "")
            {
                pic = (byte[])row["avatar"];
                picture = new MemoryStream(pic);
                this.Avatar = Image.FromStream(picture);
            }
            else
                this.Avatar = null;
            if (row["birthDay"].ToString() != null)
                this.BirthDay = (DateTime)row["birthDay"];
            else
                this.BirthDay = new DateTime(1900, 1, 1);
            this.Address = row["address"].ToString();
            this.Phone = row["phone"].ToString();
            this.Email = row["email"].ToString();
        }
    }
}