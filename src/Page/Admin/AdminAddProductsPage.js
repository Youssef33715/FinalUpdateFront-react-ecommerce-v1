import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminAddProducts from "../../Components/Admin/AdminAddProducts";

const AdminAddProductsPage = () => (
  <AdminLayout
    section="الكتالوج / المنتجات"
    title="إضافة منتج"
    subtitle="أدخل بيانات المنتج الجديد"
  >
    <AdminAddProducts />
  </AdminLayout>
);

export default AdminAddProductsPage;
