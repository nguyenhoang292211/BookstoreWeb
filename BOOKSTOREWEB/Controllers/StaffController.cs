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
    [RoutePrefix("api/staff")]
    public class StaffController : ApiController
    {
        // GET: api/Staff
        

        // POST: api/Staff
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Staff/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Staff/5
        public void Delete(int id)
        {
        }
    }
}
