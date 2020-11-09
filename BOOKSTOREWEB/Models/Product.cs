using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;

namespace BOOKSTOREWEB.Models
{
    public class Product
    {
        private int iD;
        private int iDShop;
        private int iDType;
        private string name;
        private float price;
        private int quantity;
        private string author;
        private string description;
        private int quantitySold;
        private string publisher;
        private float rating;
        private int score;

        public int ID { get => iD; set => iD = value; }
        public int IDShop { get => iDShop; set => iDShop = value; }
        public int IDType { get => iDType; set => iDType = value; }
        public string Name { get => name; set => name = value; }
        public float Price { get => price; set => price = value; }
        public int Quantity { get => quantity; set => quantity = value; }
        public string Author { get => author; set => author = value; }
        public string Description { get => description; set => description = value; }
        public int QuantitySold { get => quantitySold; set => quantitySold = value; }
        public string Publisher { get => publisher; set => publisher = value; }
        public float Rating { get => rating; set => rating = value; }
        public int Score { get => score; set => score = value; }

        public Product()
        {

        }

        public Product(int id, int idType, string name, float price, int quantity, string author, string description, int quantitySold, string publisher, float rating, int score)
        {
            this.ID = id;
            this.IDType = idType;
            this.Name = name;
            this.Price = price;
            this.Quantity = quantity;
            this.Author = author;
            this.Description = description;
            this.QuantitySold = quantitySold;
            this.Publisher = publisher;
            this.Rating = rating;
            this.Score = score;
        }

        /// <summary>
        /// Chuyển dữ liệu từ một hàng trong DataTable thành dữ liệu Product.
        /// </summary>
        /// <param name="row"></param>
        public Product(DataRow row)
        {
            this.ID = (int)row["id"];
            this.IDType = (int)row["idType"];
            this.Name = row["name"].ToString();
            this.Price = float.Parse(row["price"].ToString());
            this.Quantity = (int)row["quantity"];
            this.Author = row["author"].ToString();
            this.Description = row["description"].ToString();
            this.QuantitySold = (int)row["quantitySold"];
            this.Publisher = row["publisher"].ToString();
            this.Rating = float.Parse(row["rating"].ToString());
            this.Score = (int)row["score"];
        }
    }
}