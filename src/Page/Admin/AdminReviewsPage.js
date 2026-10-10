import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminReviewsManage from "../../Components/Admin/AdminReviewsManage";

const AdminReviewsPage = () => (
  <AdminLayout
    section="المحتوى"
    title="التقييمات"
    subtitle="مراجعة تقييمات العملاء وحذف غير المناسب منها"
  >
    <AdminReviewsManage />
  </AdminLayout>
);

export default AdminReviewsPage;
