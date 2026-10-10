import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminAddBrand from "../../Components/Admin/AdminAddBrand";

const AdminAddBrandPage = () => (
  <AdminLayout
    section="الكتالوج"
    title="العلامات التجارية"
    subtitle="إضافة العلامات التجارية وإدارتها"
  >
    <AdminAddBrand />
  </AdminLayout>
);

export default AdminAddBrandPage;
