import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminAddCategory from "../../Components/Admin/AdminAddCategory";

const AdminAddCategoryPage = () => (
  <AdminLayout
    section="الكتالوج"
    title="الأقسام"
    subtitle="إضافة الأقسام الرئيسية وإدارتها"
  >
    <AdminAddCategory />
  </AdminLayout>
);

export default AdminAddCategoryPage;
