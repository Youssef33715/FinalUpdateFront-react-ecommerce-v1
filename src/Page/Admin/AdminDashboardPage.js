import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminDashboard from "../../Components/Admin/AdminDashboard";

const AdminDashboardPage = () => (
  <AdminLayout
    section="نظرة عامة"
    title="لوحة التحكم"
    subtitle="ملخص سريع لحالة المتجر من بيانات حقيقية"
  >
    <AdminDashboard />
  </AdminLayout>
);

export default AdminDashboardPage;
