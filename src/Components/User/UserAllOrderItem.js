import UserAllOrderCard from "./UserAllOrderCard";
import { formatDate, formatMoney } from "./accountFormat";

const UserAllOrderItem = ({ orderItem }) => {
  const id = orderItem?._id ? String(orderItem._id) : "";
  // The backend field is `ispaid` (lowercase)
  const paid = orderItem?.ispaid === true;
  const delivered = orderItem?.isDelivered === true;
  const isCard = orderItem?.paymentMethodType === "card";
  const items = Array.isArray(orderItem?.cartItems) ? orderItem.cartItems : [];

  const ship = orderItem?.shippingAddress || {};
  const shipLine = [ship.details, ship.city, ship.postalCode].filter(Boolean).join("، ");
  const hasShip = !!(shipLine || ship.phone);

  const tax = Number(orderItem?.taxPrice) || 0;
  const shipping = Number(orderItem?.shippingPrice) || 0;

  return (
    <div className="acct-card acct-order">
      <div className="acct-order-head">
        <div>
          <div className="acct-order-id" title={id}>طلب رقم #{id.slice(-8).toUpperCase() || "—"}</div>
          <div className="acct-order-date">{formatDate(orderItem?.createdAt)}</div>
        </div>
        <div className="acct-order-total">
          <span>الإجمالي</span>
          <b>{formatMoney(orderItem?.totalOrderPrice)}</b>
        </div>
      </div>

      <div className="acct-badges">
        <span className={"acct-badge " + (paid ? "ok" : "warn")}>
          {paid ? "تم الدفع" : "لم يتم الدفع"}
          {paid && orderItem?.paidAt ? ` · ${formatDate(orderItem.paidAt)}` : ""}
        </span>
        <span className={"acct-badge " + (delivered ? "ok" : "neutral")}>
          {delivered ? "تم التوصيل" : "لم يتم التوصيل"}
          {delivered && orderItem?.deliveredAt ? ` · ${formatDate(orderItem.deliveredAt)}` : ""}
        </span>
        <span className="acct-badge neutral">
          {isCard ? "بطاقة ائتمانية" : "الدفع عند الاستلام"}
        </span>
      </div>

      <div className="acct-order-items">
        {items.map((item, index) => (
          <UserAllOrderCard key={item?._id || index} item={item} />
        ))}
      </div>

      {hasShip || tax > 0 || shipping > 0 ? (
        <div className="acct-order-foot">
          {hasShip ? (
            <div>
              <div className="acct-k">عنوان الشحن</div>
              {shipLine ? <div className="acct-v">{shipLine}</div> : null}
              {ship.phone ? <div className="acct-v acct-muted">{ship.phone}</div> : null}
            </div>
          ) : (
            <div />
          )}
          {tax > 0 || shipping > 0 ? (
            <div className="acct-order-sums">
              {tax > 0 ? <div><span>الضريبة</span><b>{formatMoney(tax)}</b></div> : null}
              {shipping > 0 ? <div><span>الشحن</span><b>{formatMoney(shipping)}</b></div> : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default UserAllOrderItem;
