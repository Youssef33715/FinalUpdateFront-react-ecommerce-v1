import AdminLayout from "../../Components/Admin/AdminLayout";
import AdminUsersManage from "../../Components/Admin/AdminUsersManage";

const AdminUsersPage = () => (
  <AdminLayout
    section="العملاء"
    title="المستخدمين"
    subtitle="إدارة حسابات المستخدمين وأدوارهم"
  >
    <AdminUsersManage />
  </AdminLayout>
);

export default AdminUsersPage;
