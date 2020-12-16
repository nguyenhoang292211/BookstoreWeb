using BOOKSTOREWEB.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class TypesDAO
    {
        private static TypesDAO instance;
        public static TypesDAO Instance
        { 
            get
            {
                if (instance == null)
                    instance = new TypesDAO();
                return instance;
            }
            private set { instance = value; }
        }
        
        public TypesDAO()
        {

        }

  
        /// <summary>
        /// Lấy danh sách Types dưới dạng danh sách class Types.
        /// </summary>
        /// <returns>List<Types> != null nếu có phần tử -- List<Types> == null nếu không có phần tử trả về</Types></returns>
        public List<Types> GetTypes()
        {
            List<Types> types = new List<Types>();
            DataTable data = DataProvider.Instance.ExecuteQuery("SELECT * FROM Types");
            foreach (DataRow row in data.Rows)
            {
                Types type = new Types(row);
                types.Add(type);
            }
            return types;
        }

        public DataTable GetTableTypes()
        {
            DataTable data = DataProvider.Instance.ExecuteQuery("getTop5typeBook");
            return data;
            
        }


        /// <summary>
        /// Thêm một loại type mới vào trong Database.
        /// </summary>
        /// <param name="types"></param>
        /// <returns>true: Add thành công - false: add thất bại</returns>
        public bool AddTypes(Types types)
        {
            string query = "INSERT INTO Types (idCategory, name) VALUES ( @idCategory , @name )";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { types.IDCategory, types.Name });
            return result > 0;
        }

        /// <summary>
        /// Cập nhật dữ liệu Types thông qua id.
        /// </summary>
        /// <param name="types"></param>
        /// <returns>true: update thành công - false: update thất bại.</returns>
        public bool UpdateTypes(Types types)
        {
            string query = "UPDATE Types SET idCategory = @idcategory , name = @name WHERE id = @id";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { types.IDCategory, types.Name, types.ID });
            return result > 0;
        }

        /// <summary>
        /// Xóa dữ liệu Types thông qua id của types.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>true: Xóa thành công - false: Xóa thất bại</returns>
        public bool DeleteTypes(int id)
        {
            string query = "DELETE Types WHERE id = @id";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { id });
            return result > 0;
        }

        /// <summary>
        /// Lấy danh sách Types theo idCategory (Loại sách).
        /// </summary>
        /// <param name="idCategory"></param>
        /// <returns>DataTable: Trả về danh sách Types trả về id và tên của Types đó - null: danh sách rỗng</returns>
        public DataTable GetTypesByIDCategory(int idCategory)
        {
            string query = "SELECT id, name FROM Types WHERE idCategory = @idCategory ORDER BY id";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { idCategory });
            return data;
        }

        public List<Types> GetTypesByIDCategory1(int idCategory)
        {
            string query = "SELECT id, idCategory , name FROM Types WHERE idCategory = @idCategory ORDER BY id";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { idCategory });
            if (data.Rows.Count == 0) return null;
            List<Types> list = new List<Types>();
           
            foreach(DataRow row in data.Rows)
            {
                Types a = new Types(row);
                list.Add(a);

            }
            return list;
        }

        public string getNameType (int idType)
        {
            string query = "SELECT name FROM Types WHERE id = @id ";
            DataTable data = DataProvider.Instance.ExecuteQuery(query, new object[] { idType });
            if (data.Rows.Count == 0) return "None";

            return data.Rows[0][0].ToString();
        }
    }
}