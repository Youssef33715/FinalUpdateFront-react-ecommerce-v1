import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserAddressCard from "./UserAddressCard";
import VeiwAddressHook from "../../hook/user/veiw-address-hook";

const UserAllAddress = () => {
  const [res, loading] = VeiwAddressHook();

  const addresses = res && Array.isArray(res.data) ? res.data : [];
  const failed = !loading && !(res && Array.isArray(res.data));

  return (
    <div className="acct-main">
      <div className="acct-page-head">
        <div>
          <div className="acct-eyebrow">دفتر العناوين</div>
          <div className="acct-title">عناويني</div>
          <div className="acct-subtitle">عناوين الشحن المحفوظة لاستخدامها عند إتمام الشراء</div>
        </div>
        {!loading && !failed ? (
          <Link to="/user/add-address" className="acct-btn acct-btn-link">إضافة عنوان جديد</Link>
        ) : null}
      </div>

      {loading ? (
        <div className="acct-state">جاري تحميل العناوين...</div>
      ) : failed ? (
        <div className="acct-state acct-state-error">تعذّر تحميل العناوين، حاول مرة أخرى لاحقًا</div>
      ) : addresses.length === 0 ? (
        <div className="acct-card acct-empty">
          <div className="acct-empty-t">لا توجد عناوين محفوظة</div>
          <div className="acct-empty-d">أضف عنوان شحن لتسريع إتمام طلباتك القادمة</div>
          <Link to="/user/add-address" className="acct-btn acct-btn-link">إضافة عنوان جديد</Link>
        </div>
      ) : (
        <div className="acct-addr-grid">
          {addresses.map((item) => (
            <UserAddressCard key={item._id} item={item} />
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserAllAddress;
