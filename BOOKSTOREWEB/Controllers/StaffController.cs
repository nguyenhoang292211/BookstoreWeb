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
        [HttpGet]
        [Route("list-transport")]
        public DataTable Get()
        {
            return StaffDAO.Instance.GetListTransport();
        }

        [HttpGet]
        [Route("list-transport/{state}")]
        public DataTable GetListTransportByState(string state)
        {
            return StaffDAO.Instance.GetListTransportByState(state);
        }

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
