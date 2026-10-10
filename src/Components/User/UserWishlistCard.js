import { Link } from "react-router-dom";
import { formatMoney } from "./accountFormat";

const UserWishlistCard = ({ item, busy, disabled, onRemove, onAddToCart }) => {
  const hasDiscount = Number(item?.priceAfterDiscount) >= 1;
  const outOfStock = typeof item?.quantity === "number" && item.quantity <= 0;
  const hasRating = Number(item?.ratingsQuantity) > 0;

  return (
    <div className="acct-wish-card">
      <Link to={`/products/${item._id}`} className="acct-wish-img">
        <img src={item.imageCover} alt={item.title || ""} />
      </Link>
      <div className="acct-wish-body">
        <Link to={`/products/${item._id}`} className="acct-wish-title">
          {item.title}
        </Link>
        <div className="acct-wish-meta">
          {hasRating ? (
            <span className="acct-wish-rate">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5L9 8.9z" /></svg>
              {item.ratingsAverage || 0} ({item.ratingsQuantity})
            </span>
          ) : <span />}
          {outOfStock ? <span className="acct-badge bad">غير متوفر</span> : null}
        </div>
        <div className="acct-wish-price">
          {hasDiscount ? (
            <>
              <b>{formatMoney(item.priceAfterDiscount)}</b>
              <s>{formatMoney(item.price)}</s>
            </>
          ) : (
            <b>{formatMoney(item.price)}</b>
          )}
        </div>
        <div className="acct-wish-actions">
          <button
            type="button"
            className="acct-btn"
            disabled={disabled || outOfStock}
            onClick={() => onAddToCart(item)}
          >
            {busy ? "جاري التنفيذ..." : "أضف إلى السلة"}
          </button>
          <button
            type="button"
            className="acct-btn-outline"
            disabled={disabled}
            onClick={() => onRemove(item._id)}
          >
            إزالة
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserWishlistCard;
