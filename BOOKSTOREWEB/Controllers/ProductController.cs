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
        [Route("getNameType/{typeID}")]
        public string GetNameType (int typeID)
        {
            return TypesDAO.Instance.getNameType(typeID);
        }

        [HttpGet]
        [Route("getproduct/{typeID}")]
        public List<Product> GetProductbyTypeID(int typeID)
        {
            return ProductDAO.Instance.GetProductWithType(typeID);
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


        //Thao get all Product
        [HttpGet]
        [Route("listProduct")]
        public DataTable Get()
        {
            return ProductDAO.Instance.GetListProduct();
        }
        //Get listproduct of Customer
        [HttpGet]
        [Route("listProduct/{idCus}")]
        public DataTable GetListBookByIDCus(int idCus)
        {
            return ProductDAO.Instance.GetProductByIdCus(idCus);
        }
        //Lấy thông sản phẩm theo id
        [HttpGet]
        [Route("detailProduct/{idPro}")]
        public DataTable GetDetailProduct(int idPro)
        {
            return ProductDAO.Instance.GetDetailProduct(idPro);
        }
        //Lấy các bình luận của một sản phẩm cụ thể
        [HttpGet]
        [Route("comment/{idPro}")]
        public DataTable GetCommentOfProduct(int idPro)
        {
            return ProductDAO.Instance.GetCommentOfProduct(idPro);
        }
        //Lấy số lượng sản phẩm trong giỏ hàng
        [HttpGet]
        [Route("quantityOfInCart/{idCus}")]
        public int GetQuantityInCArt(int idCus)
        {
            return ProductDAO.Instance.GetQuantityInCart(idCus);
        }

        //Lưu vào giỏ hàng của khách hàng
        [HttpPost]
        [Route("createOrder/{idCus}/{idPro}/{quantity}")]
        public bool CreateOrder(int idCus, int idPro, int quantity)
        {
            return ProductDAO.Instance.SaveInCart(idCus, idPro, quantity);
        }
        // POST: api/Product
        //Thao-POST:ap/product/createComment
        [HttpPost]
        [Route("createComment")]
        public bool SaveComment([FromBody] Comment com)
        {
            return ProductDAO.Instance.SaveComment(com);
        }


        // End Thao API
    }
}