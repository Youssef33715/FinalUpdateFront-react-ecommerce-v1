import { Link } from "react-router-dom";
import { formatDate, paymentLabel } from "./adminFormat";

// Only the two real Order flags (ispaid / isDelivered) drive the status.
const AdminAllOrdersItem = ({ orderItem }) => {
  return (
    <tr>
      <td>
        <Link to={`/admin/orders/${orderItem?._id}`} className="adm-strong" style={{ textDecoration: "none" }}>
          #{orderItem?._id?.slice(-5)}
        </Link>
      </td>
      <td>
        <div className="adm-strong">{orderItem?.user?.name || "عميل"}</div>
        <div className="adm-sub2">{orderItem?.user?.email}</div>
      </td>
      <td>{formatDate(orderItem?.createdAt)}</td>
      <td className="adm-num">{orderItem?.totalOrderPrice || 0} ج.م</td>
      <td>{paymentLabel(orderItem)}</td>
      <td>
        <span className={`adm-status ${orderItem?.ispaid ? "ok" : "warn"}`}>
          <span className={`adm-dot ${orderItem?.ispaid ? "adm-dot-ok" : "adm-dot-warn"}`} />
          {orderItem?.ispaid ? "تم الدفع" : "لم يتم الدفع"}
        </span>
      </td>
      <td>
        <span className={`adm-status ${orderItem?.isDelivered ? "ok" : "gy"}`}>
          <span className={`adm-dot ${orderItem?.isDelivered ? "adm-dot-ok" : "adm-dot-gy"}`} />
          {orderItem?.isDelivered ? "تم التوصيل" : "لم يتم التوصيل"}
        </span>
      </td>
      <td>
        <Link to={`/admin/orders/${orderItem?._id}`} className="adm-btn-outline adm-btn-sm">
          التفاصيل
        </Link>
      </td>
    </tr>
  );
};

export default AdminAllOrdersItem;
