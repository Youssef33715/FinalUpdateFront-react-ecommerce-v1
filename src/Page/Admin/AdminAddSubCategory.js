import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminAddSubCategoryComponent from "../../Components/Admin/AdminAddSubCategory";

const AdminAddSubCategoryPage = () => (
  <AdminLayout
    section="الكتالوج"
    title="الأقسام الفرعية"
    subtitle="ربط الأقسام الفرعية بالأقسام الرئيسية وإدارتها"
  >
    <AdminAddSubCategoryComponent />
  </AdminLayout>
);

export default AdminAddSubCategoryPage;
