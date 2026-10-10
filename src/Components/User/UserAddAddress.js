import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAddressHook from "../../hook/user/add-address-hook";
import UserAddressForm from "./UserAddressForm";

const UserAddAddress = () => {
  const [form, onChange, onSubmit, submitting] = AddAddressHook();
  return (
    <div className="acct-main">
      <div className="acct-eyebrow">دفتر العناوين</div>
      <div className="acct-title">إضافة عنوان جديد</div>
      <div className="acct-subtitle">احفظ عنوان شحن لاستخدامه سريعًا عند إتمام الشراء</div>
      <UserAddressForm
        eyebrow="بيانات العنوان"
        title="عنوان الشحن"
        subtitle="الحقول المعلّمة بـ * مطلوبة"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        submitting={submitting}
        submitLabel="إضافة العنوان"
      />
      <ToastContainer />
    </div>
  );
};

export default UserAddAddress;
