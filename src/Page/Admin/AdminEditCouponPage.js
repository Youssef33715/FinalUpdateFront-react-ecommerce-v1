import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminEditCoupon from "../../Components/Admin/AdminEditCoupon";

const AdminEditCouponPage = () => (
  <AdminLayout
    section="التسويق / الكوبونات"
    title="تعديل الكوبون"
    subtitle="عدّل بيانات الكوبون"
  >
    <AdminEditCoupon />
  </AdminLayout>
);

export default AdminEditCouponPage;
