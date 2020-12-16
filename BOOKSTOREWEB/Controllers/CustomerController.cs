using BOOKSTOREWEB.DAO;
using BOOKSTOREWEB.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.Results;
using System.Web.UI.WebControls;

namespace BOOKSTOREWEB.Controllers
{
    [RoutePrefix("api/customer")]
    public class CustomerController : ApiController
    {
        // GET: api/Customer
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Customer/5
        public string Get(int id)
        {
            return "value";
        }

        public class CustomerInfo
        {
            public Customer customer { get; set; }
            public Account account { get; set; }
        }

        [HttpPost]
        [Route("addcustomer")]
        public bool PostAddCustomer([FromBody] CustomerInfo user)
        {
            Customer customer = user.customer;
            Account account = user.account;
            return CustomerDAO.Instance.AddCustomer(customer, account);
        }

        // POST: api/Customer
        [HttpPost]
        [Route("isexistemail")]
        public bool PostIsExistEmail([FromBody]Customer customer)
        {
            if( CustomerDAO.Instance.IsExistEmail(customer.Email))
            {
                VarDAO.Instance.customer.Email = customer.Email;
                return true;
            }
            return false;
        }

        // PUT: api/Customer/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Customer/5
        public void Delete(int id)
        {
        }

        [HttpGet]
        [Route("getCustomerInfo/{idAcc}")]
        public Customer GetCustomerInfo (int idAcc)
        {
            return CustomerDAO.Instance.GetCustomer(idAcc);
        }
    }
}
