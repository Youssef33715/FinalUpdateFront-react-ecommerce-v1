import { Link } from "react-router-dom";

// Shared form for Add/Edit address. Field names match the backend schema
// (alias, detalis, phone, city, postalCode). City and postal code are optional.
const UserAddressForm = ({ eyebrow, title, subtitle, form, onChange, onSubmit, submitting, submitLabel }) => {
  return (
    <div className="acct-card">
      <div className="acct-card-head">
        <div className="acct-eyebrow">{eyebrow}</div>
        <div className="acct-t">{title}</div>
        <div className="acct-d">{subtitle}</div>
      </div>

      <div className="acct-form-grid">
        <div className="acct-field acct-full">
          <label htmlFor="addr-alias">تسمية العنوان <i>*</i></label>
          <input
            id="addr-alias"
            type="text"
            value={form.alias}
            onChange={(e) => onChange("alias", e.target.value)}
            placeholder="مثلا: المنزل - العمل"
          />
        </div>
        <div className="acct-field acct-full">
          <label htmlFor="addr-detalis">العنوان بالتفصيل <i>*</i></label>
          <textarea
            id="addr-detalis"
            rows="3"
            value={form.detalis}
            onChange={(e) => onChange("detalis", e.target.value)}
            placeholder="الشارع، رقم المبنى، الشقة، علامة مميزة"
          />
        </div>
        <div className="acct-field">
          <label htmlFor="addr-city">المدينة</label>
          <input
            id="addr-city"
            type="text"
            value={form.city}
            onChange={(e) => onChange("city", e.target.value)}
          />
        </div>
        <div className="acct-field">
          <label htmlFor="addr-postal">الرمز البريدي</label>
          <input
            id="addr-postal"
            type="text"
            value={form.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
          />
        </div>
        <div className="acct-field acct-full">
          <label htmlFor="addr-phone">رقم الهاتف <i>*</i></label>
          <input
            id="addr-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="acct-form-actions">
        <button type="button" className="acct-btn" onClick={onSubmit} disabled={submitting}>
          {submitting ? "جاري الحفظ..." : submitLabel}
        </button>
        <Link to="/user/addresses" className="acct-btn-outline">إلغاء</Link>
      </div>
    </div>
  );
};

export default UserAddressForm;
