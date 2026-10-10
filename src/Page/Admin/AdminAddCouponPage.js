import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminAddCoupon from "../../Components/Admin/AdminAddCoupon";

const AdminAddCouponPage = () => (
  <AdminLayout
    section="التسويق"
    title="الكوبونات"
    subtitle="إنشاء كوبونات الخصم وإدارتها"
  >
    <AdminAddCoupon />
  </AdminLayout>
);

export default AdminAddCouponPage;
