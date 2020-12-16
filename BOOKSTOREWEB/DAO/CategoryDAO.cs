using BOOKSTOREWEB.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace BOOKSTOREWEB.DAO
{
    public class CategoryDAO
    {
        private static CategoryDAO instance;
        public static CategoryDAO Instance
        {
            get
            {
                if (instance == null)
                    instance = new CategoryDAO();
                return instance;
            }
            private set { instance = value; }
        }

        public CategoryDAO()
        {

        }

        /// <summary>
        /// Lấy toàn bộ danh sách Category lên và trả về List<Category> để sử dụng tiện hơn trong một số trường hợp. Có thể sử dụng trực tiếp table cho việc get API.
        /// </summary>
        /// <returns>List<Category>: danh sách toàn bộ category trong bảng. Trả về null nếu danh sách trống.</returns>
        public List<Category> GetCategories()
        {
            List<Category> categories = new List<Category>();
            DataTable data = DataProvider.Instance.ExecuteQuery("SELECT * FROM Category");
            foreach (DataRow row in data.Rows)
            {
                Category category = new Category(row);
                categories.Add(category);
            }
            return categories;
        }

        /// <summary>
        /// Thêm tên category vào SQL, không thêm id vì ID tăng theo thứ tự.
        /// </summary>
        /// <param name="category"></param>
        /// <returns>true: add thành công - false: add thất bại</returns>
        public bool AddCategory(Category category)
        {
            string query = "INSERT INTO Category (name) VALUES ( @name )";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { category.Name });
            return result > 0;
        }

        /// <summary>
        /// Cập nhật tên của category
        /// </summary>
        /// <param name="category"></param>
        /// <returns>true: update thành công - false: update thất bại</returns>
        public bool UpdateCategory(Category category)
        {
            string query = "UPDATE Category SET name = @name WHERE id = @id";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { category.Name, category.ID });
            return result > 0;
        }

        /// <summary>
        /// Xóa category thông qua id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>true: delete thành công - false: delete thất bại</returns>
        public bool DeleteCategory(int id)
        {
            string query = "DELETE Account WHERE id = @id";
            int result = DataProvider.Instance.ExecuteNonQuery(query, new object[] { id });
            return result > 0;
        }
    }
}