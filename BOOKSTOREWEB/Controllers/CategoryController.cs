using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BOOKSTOREWEB.Models;
using BOOKSTOREWEB.DAO;
using System.Web.Http;

namespace BOOKSTOREWEB.Controllers
{
    [RoutePrefix("api/Category")]
    public class CategoryController : ApiController
    {
        // GET: Category
        [HttpGet]
        [Route("type")]
        public List<Category> GetCategories()
        {
           
            return CategoryDAO.Instance.GetCategories();
        }
        [HttpGet]
        [Route("type/{idCate}")]
        public List<Types> GetTypeWithCate (int idCate)
        {
            TypesDAO types = new TypesDAO();
            return TypesDAO.Instance.GetTypesByIDCategory1(idCate);
        }
    }
}