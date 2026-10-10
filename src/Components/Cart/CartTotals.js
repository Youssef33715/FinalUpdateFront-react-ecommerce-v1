import { cartTotals, formatMoney } from "./cartHelpers";

// Subtotal / discount / total rows, shared by the Cart and Checkout summaries.
// Only values the backend actually returns are shown (no shipping, no tax).
const CartTotals = ({ totalCartPrice, totalCartPriceAfterDiscount }) => {
  const { subtotal, hasDiscount, discount, total } = cartTotals(
    totalCartPrice,
    totalCartPriceAfterDiscount,
  );
  return (
    <div className="shop-totals">
      <div className="shop-total-row">
        <span>المجموع الفرعي</span>
        <b>{formatMoney(subtotal)}</b>
      </div>
      {hasDiscount ? (
        <div className="shop-total-row">
          <span>
            خصم الكوبون <i className="shop-pill ok">مفعّل</i>
          </span>
          <b className="shop-ok">−{formatMoney(discount)}</b>
        </div>
      ) : null}
      <div className="shop-total-row shop-total-final">
        <span>الإجمالي</span>
        <b>{formatMoney(total)}</b>
      </div>
    </div>
  );
};

export default CartTotals;
