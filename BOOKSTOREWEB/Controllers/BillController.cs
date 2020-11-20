using BOOKSTOREWEB.DAO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BOOKSTOREWEB.Controllers
{
    [RoutePrefix("api/bill")]
    public class BillController : ApiController
    {
        [HttpGet]
        [Route("list-transport")]
        public DataTable Get()
        {
            return BillDAO.Instance.GetListTransport();
        }

        [HttpGet]
        [Route("list-transport/{state}")]
        public DataTable GetListTransportByState(string state)
        {
            return BillDAO.Instance.GetListTransportByState(state);
        }

        [HttpGet]
        [Route("list-transport-detail/{idBill}")]
        public DataTable GetTransportDetailByIDBill(int idBill)
        {
            return BillDAO.Instance.GetTransportDetailByIDBill(idBill);
        }

        // POST: api/Bill
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Bill/5
        [HttpPut]
        [Route("update-transport/{idBill}/{state}")]
        public bool Put(int idBill, string state)
        {
            return BillDAO.Instance.UpdateOrderStateByIdBill(idBill, state);
        }

        // DELETE: api/Bill/5
        public void Delete(int id)
        {
        }
    }
}
