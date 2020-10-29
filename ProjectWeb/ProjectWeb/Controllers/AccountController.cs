using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectWeb.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        [HttpGet]
        [Route("")]
        // GET: api/Account
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet]
        [Route("")]
        // GET: api/Account/5
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        [Route("")]
        // POST: api/Account
        public void Post([FromBody]string value)
        {
        }

        [HttpPut]
        [Route("")]
        // PUT: api/Account/5
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpDelete]
        [Route("")]
        // DELETE: api/Account/5
        public void Delete(int id)
        {
        }
    }
}
