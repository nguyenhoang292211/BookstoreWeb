using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using BOOKSTOREWEB.DAO;
using System.Net.Http;
using System.Web.Http;
using BOOKSTOREWEB.Models;

namespace BOOKSTOREWEB.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        // GET: Product
        [HttpGet]
        [System.Web.Http.Route("listallproduct")]
        public DataTable GetAll()
        {
            return ProductDAO.Instance.GetProducts();    
        }


        [HttpGet]
        [System.Web.Http.Route("listalltypeproduct")]
        public DataTable GetListType()
        {
           return TypesDAO.Instance.GetTableTypes();
        }

        [HttpGet]
        [Route("listbestsaler")]
        public List<Product> GetTheBestsaler ()
        {
            ProductDAO a = new ProductDAO();
            return a.GetThebestSaler(6);
        }


        [HttpGet]
        [Route("listalltypeproduct/{typename}")]
        public DataTable GetProductbyTypename(string typename)
        {
            return ProductDAO.Instance.GetProductWithType(typename);
        }

        [HttpGet]
        [Route("listallHotdeal")]
        public List<Product> GetProductbyHotdeal()
        {
            return ProductDAO.Instance.GetListHotdealProduct();
        }


        [HttpPost] 
        [Route("addtocart")] 
        // POST: api/product
        public bool HandleCart([FromBody] Cart cart) //[From Body] là dùng để truyền dữ liệu thông qua Request Body.
        {
            int quantity = Checkquantity(cart.IDCustomer, cart.IDProduct);
            //nếu chưa có loại hàng này thì số lượng =1;
            if (quantity == 0)
            {
                cart.Quantity = quantity + 1;
                return CartDAO.Instance.AddCart(cart);
            }

            else
            //Trường hợp đã có hàng sẵn thì cập nhật lại số lượng
            {
                return CartDAO.Instance.UpdateCart(cart.IDCustomer, cart.IDProduct, quantity+1);
            }
                   
        }

        //Kiểm tra trong giỏ hàng đã có sản phẩm này chưa. Nếu có thì lấy số lương trả về, chưa thì trả về 0
        
        public int Checkquantity(int idCus, int idPro)
        {

            return CartDAO.Instance.Checkquantity(idPro, idCus);
        }

        [HttpPut]
        [Route("update-cart/{idCus}/{idPro}")]
        public bool UpdateCart (int idCus, int idPro, int quantity)
        {
            return CartDAO.Instance.UpdateCart(idCus, idPro, quantity);
        }
    }
}