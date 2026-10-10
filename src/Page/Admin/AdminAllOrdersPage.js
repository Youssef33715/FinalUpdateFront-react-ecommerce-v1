import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminAllOrders from "../../Components/Admin/AdminAllOrders";

const AdminAllOrdersPage = () => (
  <AdminLayout
    section="المبيعات"
    title="الطلبات"
    subtitle="متابعة طلبات العملاء وحالات الدفع والتوصيل"
  >
    <AdminAllOrders />
  </AdminLayout>
);

export default AdminAllOrdersPage;
