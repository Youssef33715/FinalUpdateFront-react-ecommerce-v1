import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminOrderDetails from "../../Components/Admin/AdminOrderDetails";

const AdminOrderDetailsPage = () => (
  <AdminLayout
    section="المبيعات / الطلبات"
    title="تفاصيل الطلب"
    subtitle="بيانات الطلب والعميل وتحديث الحالة"
  >
    <AdminOrderDetails />
  </AdminLayout>
);

export default AdminOrderDetailsPage;
