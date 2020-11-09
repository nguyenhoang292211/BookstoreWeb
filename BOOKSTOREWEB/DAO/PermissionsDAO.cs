using BOOKSTOREWEB.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class PermissionsDAO
    {
        private static PermissionsDAO instance;
        public static PermissionsDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new PermissionsDAO();
                return instance;
            }
            private set { instance = value; }
        }

        private PermissionsDAO()
        {

        }

        /// <summary>
        /// Lấy toàn bộ danh sách Quyền truy cập vào ứng dụng.
        /// </summary>
        /// <returns>List<Permissions>: Danh sách toan bộ quyền. Trả về null nếu danh sách rỗng.</returns>
        public List<Permissions> GetPermissions()
        {
            List<Permissions> permissions = new List<Permissions>();
            DataTable data = DataProvider.Instance.ExecuteQuery("SELECT * FROM Permissions");
            foreach (DataRow row in data.Rows)
            {
                Permissions permission = new Permissions(row);
                permissions.Add(permission);
            }
            return permissions;
        }

        /// <summary>
        /// Thêm loại quyền truy cập mới vào danh sách.
        /// </summary>
        /// <param name="permission"></param>
        /// <returns>true: add thành công - false: add thất bại</returns>
        public bool AddPermission(Permissions permission)
        {
            string query = "INSERT INTO Permissions (permission) VALUES ( @permission )";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { permission });
            return result > 0;
        }

        /// <summary>
        /// Cập nhật lại tên Quyền truy cập thông qua id của nó.
        /// </summary>
        /// <param name="permissions"></param>
        /// <returns>true: update thành công - false: update thất bại</returns>
        public bool UpdatePermission(Permissions permissions)
        {
            string query = "UPDATE Permissions SET permission = @permission WHERE id = @id";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { permissions.Permission, permissions.ID });
            return result > 0;
        }

        /// <summary>
        /// Xóa loại quyền truy cập thông qua id của nó.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>true: delete thành công - false: delete thất bại</returns>
        public bool DeletePermission(int id)
        {
            string query = "DELETE Permission WHERE id = @id";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { id });
            return result > 0;
        }
    }
}