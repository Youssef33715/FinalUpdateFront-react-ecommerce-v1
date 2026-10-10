import { Link } from "react-router-dom";
import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminAllProduct from "../../Components/Admin/AdminAllProduct";

const AdminAllProductsPage = () => (
  <AdminLayout
    section="الكتالوج"
    title="المنتجات"
    subtitle="إدارة منتجات المتجر: بحث وتصفية وترتيب"
      actions={<Link to="/admin/addproduct" className="adm-btn">+ إضافة منتج</Link>}
  >
    <AdminAllProduct />
  </AdminLayout>
);

export default AdminAllProductsPage;
