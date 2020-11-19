using BOOKSTOREWEB.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class CustomerDAO
    {
        private static CustomerDAO instance;
        public static CustomerDAO Instance
        { 
            get
            {
                if (instance == null)
                    instance = new CustomerDAO();
                return instance;
            }
            private set { instance = value; }
        }

        private CustomerDAO()
        {

        }

        public bool AddCustomer(Customer customer, Account account)
        {
            string userName = account.UserName;
            string passWord = account.PassWord;
            string name = customer.Name;
            DateTime birthDay = customer.BirthDay;
            string gender = customer.Gender;
            string address = customer.Address;
            string phone = customer.Phone;
            string email = customer.Email;
            string query = "EXEC USP_AddCustomer @userName , @passWord , @name , @birthDay , @gender , @address , @phone , @email";
            object[] obj = new object[] { userName, passWord, name, birthDay, gender, address, phone, email};
            int result = DataProvider.Instance.ExecuteNonQuery(query, obj);
            return result > 0;
        }


        public bool IsExistEmail(string email)
        {
            string query = "SELECT * FROM dbo.Customer WHERE email = @email";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { email });
            return data.Rows.Count > 0;
        }

        public string SendEmail(string email)
        {
            string senderID = "antran2509@gmail.com";
            string senderPassword = "01692889894";
            string result = "Email Sent Successfully";
            string code = AccountDAO.Instance.CreateCode();
            string body = " " + email + " có một email từ " + senderID;
            body += ", Mã xác nhận của bạn là " + code;
            try
            {
                MailMessage mail = new MailMessage();
                mail.To.Add(email);
                mail.From = new MailAddress(senderID);
                mail.Subject = "Quên mật khẩu!";
                mail.Body = body;
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address

                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new System.Net.NetworkCredential(senderID, senderPassword);
                smtp.Port = 587;
                smtp.EnableSsl = true;
                //return "123456";
                smtp.Send(mail);
                result = code;
            }
            catch
            {
                result = "problem occurred";
                //Response.Write("Exception in sendEmail:" + ex.Message);
            }
            return result;
        }
    }
}