import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAddressHook from "../../hook/user/edit-address-hook";
import UserAddressForm from "./UserAddressForm";

const UserEditAddress = () => {
  const { id } = useParams();
  const [form, onChange, onSubmit, submitting, loading, loadFailed] = EditAddressHook(id);

  return (
    <div className="acct-main">
      <div className="acct-eyebrow">دفتر العناوين</div>
      <div className="acct-title">تعديل العنوان</div>
      <div className="acct-subtitle">حدّث بيانات عنوان الشحن المحفوظ</div>

      {loading ? (
        <div className="acct-state">جاري تحميل بيانات العنوان...</div>
      ) : loadFailed ? (
        <div className="acct-card acct-empty">
          <div className="acct-empty-t">تعذّر العثور على هذا العنوان</div>
          <div className="acct-empty-d">ربما تم حذفه أو أن الرابط غير صحيح</div>
          <Link to="/user/addresses" className="acct-btn acct-btn-link">العودة إلى عناويني</Link>
        </div>
      ) : (
        <UserAddressForm
          eyebrow="بيانات العنوان"
          title="عنوان الشحن"
          subtitle={
            form.detalis
              ? "الحقول المعلّمة بـ * مطلوبة"
              : "هذا العنوان محفوظ بدون تفاصيل — أضف العنوان بالتفصيل لإكمال الحفظ"
          }
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          submitting={submitting}
          submitLabel="حفظ التعديلات"
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default UserEditAddress;
