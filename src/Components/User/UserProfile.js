import { Modal, Button } from "react-bootstrap";
import ProfileHook from "../../hook/user/profile-hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

// Same ProfileHook, same modal state/handlers, same changePassword flow as
// before — only the visual layer changed (Concept 2, approved).
const UserProfile = () => {
  const [
    user,
    show,
    handleClose,
    handleShow,
    handelSubmit,
    name,
    email,
    phone,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    changePassword,
    oldPassword,
    newPassword,
    confirmPassword,
    onChangeOldPass,
    onChangeNewPass,
    onChangeConfirmPass,
  ] = ProfileHook();

  const initial = (user?.name || "").charAt(0).toUpperCase() || "؟";

  return (
    <div className="acct-main">
      <div className="acct-eyebrow">إدارة الحساب</div>
      <div className="acct-title">حسابي</div>
      <div className="acct-subtitle">راجع بياناتك الشخصية وتحكم في إعدادات الأمان الخاصة بحسابك</div>

      <div className="acct-hero">
        <div className="acct-hero-left">
          <div className="acct-av-lg">{initial}</div>
          <div>
            <div className="acct-name">{user?.name}</div>
            <div className="acct-email">{user?.email}</div>
            <div className="acct-tag">عميل مسجّل</div>
          </div>
        </div>
        <button className="acct-hero-edit" onClick={handleShow}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          تعديل البيانات
        </button>
      </div>

      <div className="acct-quicklinks">
        <Link to="/user/allorders" className="acct-qlink">
          <div className="acct-ql-left">
            <div className="acct-ic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M3 6h18" /><path d="M6 6l1 14h10l1-14" /><path d="M9 10v6" /><path d="M15 10v6" />
              </svg>
            </div>
            <div>
              <div className="acct-ql-t">طلباتي</div>
              <div className="acct-ql-d">تتبع طلباتك السابقة</div>
            </div>
          </div>
          <div className="acct-arrow">‹</div>
        </Link>
        <Link to="/user/favoriteproducts" className="acct-qlink">
          <div className="acct-ql-left">
            <div className="acct-ic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M20.8 4.6a5 5 0 00-7.1 0L12 6.3l-1.7-1.7a5 5 0 10-7.1 7.1L12 20.3l8.8-8.6a5 5 0 000-7.1z" />
              </svg>
            </div>
            <div>
              <div className="acct-ql-t">المفضلة</div>
              <div className="acct-ql-d">المنتجات المحفوظة</div>
            </div>
          </div>
          <div className="acct-arrow">‹</div>
        </Link>
        <Link to="/user/addresses" className="acct-qlink">
          <div className="acct-ql-left">
            <div className="acct-ic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div className="acct-ql-t">عناويني</div>
              <div className="acct-ql-d">عناوين الشحن المحفوظة</div>
            </div>
          </div>
          <div className="acct-arrow">‹</div>
        </Link>
      </div>

      <div className="acct-card">
        <div className="acct-card-head">
          <div className="acct-eyebrow">البيانات الأساسية</div>
          <div className="acct-t">المعلومات الشخصية</div>
          <div className="acct-d">هذه البيانات تُستخدم في طلباتك وفواتيرك</div>
        </div>
        <div>
          <div className="acct-info-row">
            <div className="acct-ic">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </div>
            <div>
              <div className="acct-k">الاسم الكامل</div>
              <div className="acct-v">{user?.name}</div>
            </div>
          </div>
          <div className="acct-info-row">
            <div className="acct-ic">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
              </svg>
            </div>
            <div>
              <div className="acct-k">البريد الإلكتروني</div>
              <div className="acct-v">{user?.email}</div>
            </div>
          </div>
          <div className="acct-info-row">
            <div className="acct-ic">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .3 2 .7 3a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c1 .4 2 .6 3 .7a2 2 0 011.7 2z" />
              </svg>
            </div>
            <div>
              <div className="acct-k">رقم الهاتف</div>
              <div className="acct-v">{user?.phone || "—"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="acct-card">
        <div className="acct-card-head">
          <div className="acct-eyebrow">الأمان</div>
          <div className="acct-t">تغيير كلمة المرور</div>
          <div className="acct-d">يُفضّل استخدام كلمة مرور قوية لا تستخدمها في مواقع أخرى</div>
        </div>
        <div className="acct-pw-row">
          <div className="acct-pw-field acct-full">
            <label>كلمة المرور الحالية</label>
            <input
              value={oldPassword}
              onChange={onChangeOldPass}
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="acct-pw-field">
            <label>كلمة المرور الجديدة</label>
            <input
              value={newPassword}
              onChange={onChangeNewPass}
              type="password"
              placeholder="••••••••"
            />
          </div>
          <div className="acct-pw-field">
            <label>تأكيد كلمة المرور الجديدة</label>
            <input
              value={confirmPassword}
              onChange={onChangeConfirmPass}
              type="password"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="acct-pw-actions">
          <button onClick={changePassword} className="acct-btn">
            حفظ كلمة المرور
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تعديل البيانات الشخصية</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">
            <input
              value={name}
              onChange={onChangeName}
              type="text"
              className="input-form font d-block mt-3 px-3"
              placeholder="اسم المستخدم"
            />
            <input
              value={email}
              onChange={onChangeEmail}
              type="email"
              className="input-form font d-block mt-3 px-3"
              placeholder="الايميل"
            />
            <input
              value={phone}
              onChange={onChangePhone}
              type="phone"
              className="input-form font d-block mt-3 px-3"
              placeholder="الهاتف"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button variant="dark" onClick={handelSubmit}>
            حفظ التعديل
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default UserProfile;
