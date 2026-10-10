import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminEditProducts from "../../Components/Admin/AdminEditProducts";

const AdminEditProductsPage = () => (
  <AdminLayout
    section="الكتالوج / المنتجات"
    title="تعديل المنتج"
    subtitle="عدّل بيانات المنتج ثم احفظ التغييرات"
  >
    <AdminEditProducts />
  </AdminLayout>
);

export default AdminEditProductsPage;
