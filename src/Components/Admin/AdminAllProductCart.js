import { Link } from "react-router-dom";

// One product row. Same data fields, same edit route, same delete trigger.
const AdminAllProductCart = ({ item, onAskDelete }) => {
  const inStock = (item.quantity || 0) > 0;

  return (
    <tr>
      <td>
        <div className="adm-prod-cell">
          <img
            className="adm-thumb"
            src={item.imageCover}
            alt={item.title}
            onError={(e) => (e.target.style.visibility = "hidden")}
          />
          <div>
            <div className="adm-strong">{item.title}</div>
            <div className="adm-sub2">{item.category?.name || "—"}</div>
          </div>
        </div>
      </td>
      <td>{item.brand?.name || "—"}</td>
      <td className="adm-num">{item.price} ج.م</td>
      <td className={`adm-num ${inStock ? "" : "adm-zero"}`}>{item.quantity}</td>
      <td>
        <span className={`adm-status ${inStock ? "ok" : "bad"}`}>
          <span className={`adm-dot ${inStock ? "adm-dot-ok" : "adm-dot-bad"}`} />
          {inStock ? "متوفر" : "غير متوفر"}
        </span>
      </td>
      <td>
        <div className="adm-row-actions">
          <Link to={`/products/${item._id}`} title="عرض">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
          <Link to={`/admin/editproduct/${item._id}`} title="تعديل">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </Link>
          <span className="adm-act-del" onClick={() => onAskDelete(item)} title="حذف">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6h18" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            </svg>
          </span>
        </div>
      </td>
    </tr>
  );
};

export default AdminAllProductCart;
