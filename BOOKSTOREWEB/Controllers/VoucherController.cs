using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BOOKSTOREWEB.Controllers
{
    [RoutePrefix("api/voucher")]
    public class VoucherController : ApiController
    {
        
        // GET: api/Voucher
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Voucher/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Voucher
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Voucher/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Voucher/5
        public void Delete(int id)
        {
        }
    }
}
