using BOOKSTOREWEB.DAO;
using BOOKSTOREWEB.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BOOKSTOREWEB.Controllers
{
    [RoutePrefix("api/Account")] // Dùng để định danh đường dẫn api (có thể không cần dùng tới)
    public class AccountController : ApiController
    {
        /// <summary>
        /// Thông tin chi tiết về WebAPI: https://www.tutorialsteacher.com/webapi/parameter-binding-in-web-api (một phần hướng dẫn của Web).    
        /// </summary>
        /// <returns></returns>


        [HttpGet] // Dùng để định danh phương thức API. (Có thể không có)
        // GET: Có thể nhận các giá trị nguyên thủy (int, string, ...) và giá trị phức tạp (class, ...) và không thể truyền qua Request Body.
        [Route("accounts")] //Thêm vào đường dẫn API để lấy chính xác hàm GET mong muốn (Hàm đó bắt buộc phải viết bên dưới dòng này.
        // GET: api/Account/5
        public List<Account> Get() //Có thể đặt tên khác. Ví dụ như GetListAccount() -- nếu k có [HttpGet] ở trên thì phải có từ Get đầu tên của hàm.
            // Nếu đã có phương thức [HttpGet] ở trên thì có thể đặt tên tùy ý.
        {
            return AccountDAO.Instance.GetAccounts();
        }

        [HttpGet] //Dùng để lấy dữ liệu lên Web.
        [Route("login/{userName}/{passWord}")] // login dùng để thêm vào đường dẫn [RoutePrefix("api/Account")] để xác định đến hàm GET bên dưới (có thể không dùng)
        // {userName} là giá trị truyền vào từ JS và tên phải tương ứng với parameter trong hàm. {passWord} tương tự.
        // GET: api/Account/5
        public int Get(string userName, string passWord)
        {
            return AccountDAO.Instance.GetPremission(userName, passWord);
        }

        [HttpPost] //Dùng để insert dữ liệu.
        //Post: Truyền được giá trị nguyên thủy (int, string, ...) thông qua String Query và truyền Loại phức tạp (class, ...) thông qua Request Body.
        [Route("")] // Vì ta dùng [RoutePrefix("api/Account")] nên buộc phải có [Route("")] nếu không có đường dẫn thêm thì buộc phải truyền vào "".
        // POST: api/Account
        public bool Post([FromBody] Account account) //[From Body] là dùng để truyền dữ liệu thông qua Request Body.
        {
            return AccountDAO.Instance.AddAccount(account);
        }

        [HttpPut] //Dùng để update dữ liệu.
        //Put: Truyền được giá trị nguyên thủy (int, string, ...) thông qua String Query và truyền Loại phức tạp (class, ...) thông qua Request Body.
        [Route("")]
        // PUT: api/Account/5
        public bool Put([FromBody] Account account)
        {
            return true;
        }

        [HttpDelete] //Dùng để xóa dữ liệu.
        // DELETE: Có thể nhận các giá trị nguyên thủy (int, string, ...) và giá trị phức tạp (class, ...) và không thể truyền qua Request Body.
        [Route("{userName}")]
        // DELETE: api/Account/5
        public bool Delete(string userName)
        {
            return AccountDAO.Instance.DeleteAccount(userName);
        }
    }
}
