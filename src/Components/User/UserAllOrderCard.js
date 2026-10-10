import { Link } from "react-router-dom";
import { formatMoney } from "./accountFormat";

// One product line inside an order. Everything shown is real order data;
// the product may be null if it was deleted after the order was placed.
const UserAllOrderCard = ({ item }) => {
  const product = item?.product && typeof item.product === "object" ? item.product : null;
  const qty = Number(item?.quantity) || 0;
  const price = Number(item?.price);
  const hasPrice = item?.price !== undefined && item?.price !== null && !isNaN(price);

  const thumb = product?.imageCover ? (
    <img className="acct-order-thumb" src={product.imageCover} alt={product.title || ""} />
  ) : (
    <div className="acct-order-thumb acct-order-thumb-empty" />
  );

  return (
    <div className="acct-order-item">
      {product?._id ? (
        <Link to={`/products/${product._id}`} className="acct-order-thumb-link">
          {thumb}
        </Link>
      ) : (
        thumb
      )}
      <div className="acct-order-item-main">
        {product?._id ? (
          <Link to={`/products/${product._id}`} className="acct-order-item-title">
            {product.title}
          </Link>
        ) : (
          <div className="acct-order-item-title acct-muted">منتج غير متاح</div>
        )}
        <div className="acct-order-item-meta">
          <span>الكمية: {qty}</span>
          {item?.color ? (
            <span className="acct-order-color" title={item.color} style={{ backgroundColor: item.color }} />
          ) : null}
        </div>
      </div>
      {hasPrice ? (
        <div className="acct-order-item-price">
          <b>{formatMoney(price * (qty || 1))}</b>
          {qty > 1 ? <span>{formatMoney(price)} للقطعة</span> : null}
        </div>
      ) : null}
    </div>
  );
};

export default UserAllOrderCard;
