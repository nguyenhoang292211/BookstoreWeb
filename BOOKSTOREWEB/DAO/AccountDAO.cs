using BOOKSTOREWEB.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class AccountDAO
    {
        /// <summary>
        /// Khởi tạo instance như này là trong suốt chương trình class này chỉ khởi tạo một lần duy nhất.
        /// </summary>
        private static AccountDAO instance;
        public static AccountDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new AccountDAO();
                return instance;
            }
            private set { instance = value; }
        }

        private AccountDAO()
        {

        }

        /// <summary>
        /// Lấy ra danh sách Tài khoản người dùng và nhân viên. Chỉ có admin mới có quyền này. (Có thể bổ sung thêm parameter)
        /// Sẽ bổ sung thêm chi tiết mật khẩu khách hàng thì admin cũng không thể xem được.
        /// </summary>
        /// <returns>List<Account>Danh sách Accounts</returns>
        public List<Account> GetAccounts()
        {
            List<Account> accounts = new List<Account>();
            //Sắp xếp giảm dần vì admin có idPermission số cao nhất. Và ORDER BY dùng để sắp xếp theo cột. Có thể sử dụng nhiều cột. DESC: sắp xếp giảm, ASC: sắp xếp tăng (Mặc định)
            DataTable data = DataProvider.Instance.ExecuteQuery("SELECT * FROM Account ORDER BY idPermission DESC");
            foreach (DataRow row in data.Rows)
            {
                Account account = new Account(row);
                accounts.Add(account);
            }
            return accounts;
        }

        /// <summary>
        /// Hàm này dùng để trả về quyền đăng nhập của tài khoản
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="passWord"></param>
        /// <returns>idPermission: id quyền của tài khoản được truyền vào. Nếu tài khoản đúng thì nó sẽ trả về quyền (1, 2, 3, ...) còn sai thì nó sẽ trả về 0.</returns>
        public int GetPremission(string userName, string passWord)
        {
            string query = "SELECT idPermission FROM Account WHERE userName = @username AND password = @password";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { userName, passWord });
            if (data.Rows.Count > 0)
                return (int)data.Rows[0]["idPermission"];
            return 0;
        }

        /// <summary>
        /// Thêm tài khoản người dùng. ******Cần bổ sung: Nếu khách hàng đăng ký tự động set idpermission = 1 và các trường hợp khác do admin xử lý: chỉ được thêm 2 và 3.*****
        /// </summary>
        /// <param name="account"></param>
        /// <returns>true: Add thành công - false: add thất bại</returns>
        public bool AddAccount(Account account)
        {
            string query = "INSERT INTO Account (userName, passWord, idPermission) VALUES ( @username , @password , @idPermission )";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { account.UserName, account.PassWord, account.IDPermission });
            return result > 0;
        }

        /// <summary>
        /// Xóa tài khoản người dùng thông qua username -- sẽ cập nhật xóa thông qua id sau.
        /// </summary>
        /// <param name="userName"></param>
        /// <returns>true: Delete thành công - false: delete thất bại</returns>
        public bool DeleteAccount(string userName)
        {
            string query = "DELETE Account WHERE userName = @username";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { userName });
            return result > 0;
        }

        /// <summary>
        /// Cập nhật mật khẩu của khách hàng - khách hàng tự đổi mật khẩu cho mình. Có thể áp dụng cho quyên mật khẩu.
        /// </summary>
        /// <param name="userName"></param>
        /// <returns>true: update thành công - false: update thất bại</returns>
        public bool UpdatePassWord(string userName, string passWord)
        {
            string query = "UPDATE Account SET passWord = @password WHERE userName = @username";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { passWord, userName });
            return result > 0;
        }

        /// <summary>
        /// Kiểm tra xem có tên tài khoản có tồn tại trong Database không.
        /// </summary>
        /// <param name="userName"></param>
        /// <returns>true: đã tồn tại - false: chưa tồn tại</returns>
        public bool IsExistAccount(string userName)
        {
            string query = "SELECT * FROM Account WHERE userName = @username";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { userName });
            return data.Rows.Count > 0;
        }

        /// <summary>
        /// Tìm kiếm tài khoản thông qua UserName. Dữ liệu trả về datatable vì thông tin được lấy từ 2 bảng Account và Permission.
        /// Sử dụng Procedure để viết Query. USP_SearchAccountByUserName: được viết dưới SQL.
        /// </summary>
        /// <param name="userName"></param>
        /// <returns>DataTable gồm thông tin Account của userName truyền vào</returns>
        public DataTable SearchAccountByUserName(string userName)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_SearchAccountByUserName @userName", new object[] { userName });
            return data;
        }



        /// <summary>
        /// Lọc danh sách theo Permission. Dữ liệu trả về là database vì thông tin được lấy từ 2 bảng Account và Permission.
        /// Sử dụng Precedure để viết Query. USP_GetAccountsByIDPermission: được viết dưới SQL.
        /// </summary>
        /// <param name="idPermission"></param>
        /// <returns>DataTable: Danh sách đã được sắp xếp tăng dần theo id. (ORDER BY)</returns>
        public DataTable GetAccountsByIDPermission(int idPermission)
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("USP_GetAccountsByIDPermission @idPermission", new object[] { idPermission });
            return data;
        }

        /// <summary>
        /// Tạo mã code gồm 6 số để gửi qua mail để thay đổi mật khẩu
        /// </summary>
        /// <returns></returns>
        public string CreateCode()
        {
            Random rd = new Random();
            string code = "";
            for (int i = 0; i < 6; i++)
            {
                code += rd.Next(1, 9).ToString();
            }
            return code;
        }

        public bool UpdatePassWordByEmail(string email, string password)
        {
            string query = "USP_UpdatePassWordByEmail @password , @email";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { password, email });
            return result > 0;
        }

        /// <summary>
        /// Lấy account bằng username
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public Account GetAccount(string username)
        {

            DataTable data = DataProvider.Instance.ExecuteQuery("select * from Account where userName= @userName", new object[] { username });
            if (data.Rows.Count > 0)
               return  new Account(data.Rows[0]);
            return null;
        }
    }
}