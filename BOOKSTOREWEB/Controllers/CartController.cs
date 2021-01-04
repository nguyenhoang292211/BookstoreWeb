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
    [RoutePrefix("api/cart")]
    public class CartController : ApiController
    {
        // GET: api/Cart
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/Cart/5
        public string Get(int id)
        {
            return "value";
        }

        //GUI_Thao: get List Product in Cart of User
        [HttpGet]
        [Route("customerInfo/{idCus}")]
        public DataTable GetInfoCustomer(int idCus)
        {
            return CartDAO.Instance.GetInfoCustomer(idCus);

        }
       
        //GUI_Thao: Lấy các sản phẩm trong giỏ hàng.
        [HttpGet]
        [Route("listBuying/{idCus}")]
        public DataTable GetLListBuying(int idCus)
        {
            return CartDAO.Instance.GetCartByIdCus(idCus);
        }
      
        //GUI_Thao: Lấy phí ship của một đơn vị vận chuyển
        [HttpGet]
        [Route("getFeeShip/{idDel}")]
        public DataTable GetFeeShip(int idDel)
        {
            return CartDAO.Instance.GetFeeShip(idDel);
        }
        //GUI_Thao: Get lấy các sản phẩm người dùng muốn mua hiện tại.
     
        // POST: api/Cart
        public void Post([FromBody] string value)
        {
        }
        [HttpPost]
        [Route("listSelectPro/{idCus}")]
        public DataTable GetListSelectPro(int idCus, [FromBody] int[] listProducts)
        {
            DataTable tb = new DataTable();
            int[] listProductsTemp = listProducts;
           
                    
            tb = CartDAO.Instance.GetListSelectPro(idCus, Convert.ToInt32(listProductsTemp[0]));
           
            for (int i = 1; i < listProductsTemp.Length; i++)
            {
                DataTable temptb = CartDAO.Instance.GetListSelectPro(idCus, Convert.ToInt32(listProductsTemp[i]));
                if (temptb.Rows.Count > 0)
                {
                    // Data r = temptb.Rows[0].;
                    tb.ImportRow(temptb.Rows[0]);
                }
            }
            return tb;
        }
        // PUT: api/Cart/5
        public void Put(int id, [FromBody] string value)
        {
        }
        //GUI_Thao: Tăng (1) sản phẩm
        [HttpPut]
        [Route("plusAProduct/{idCus}/{idPro}")]
        public bool PlusAProduct(int idCus, int idPro)
        {
            return CartDAO.Instance.PlusAProduct(idCus, idPro);
        }
        //GUI_Thao: Giảm (1) sản phẩm
        [HttpPut]
        [Route("minusAProduct/{idCus}/{idPro}")]
        public bool MinusAProduct(int idCus, int idPro)
        {
            return CartDAO.Instance.MinusAProduct(idCus, idPro);
        }



        // DELETE: api/Cart/5
        public void Delete(int id)
        {
        }
        //GUI_Thao: Xóa một sản phẩm 
        [HttpDelete]
        [Route("deleteOutCart/{idCus}/{idPro}")]
        public bool DeleteOutCart(int idCus, int idPro)
        {
            return CartDAO.Instance.DeleteOutCart(idCus, idPro);
        }
    }
}
