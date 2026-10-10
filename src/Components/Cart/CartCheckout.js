import { Link } from "react-router-dom";
import ApplayCouponHook from "../../hook/cart/applay-coupon-hook";
import notify from "../../hook/useNotifaction";
import CartTotals from "./CartTotals";
import { cartTotals, formatMoney } from "./cartHelpers";

// Order summary for the cart page: coupon, totals and the checkout button.
// `blockedMessage` is set when a cart line can't be bought (deleted / out of stock).
const CartCheckout = ({
  totalCartPrice,
  cartItems,
  totalCartPriceAfterDiscount,
  blockedMessage,
}) => {
  const [couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout, applying] =
    ApplayCouponHook(cartItems);
  const { total } = cartTotals(totalCartPrice, totalCartPriceAfterDiscount);

  const goCheckout = () => {
    if (blockedMessage) {
      notify(blockedMessage, "warn");
      return;
    }
    handelCheckout();
  };

  return (
    <>
      <div className="shop-card shop-summary">
        <div className="shop-summary-title">ملخص الطلب</div>

        <label className="shop-label" htmlFor="shop-coupon">كود الخصم</label>
        <div className="shop-coupon">
          <input
            id="shop-coupon"
            type="text"
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handelSubmitCoupon()}
            placeholder="أدخل الكود"
          />
          <button type="button" onClick={handelSubmitCoupon} disabled={applying}>
            {applying ? "..." : "تطبيق"}
          </button>
        </div>

        <CartTotals
          totalCartPrice={totalCartPrice}
          totalCartPriceAfterDiscount={totalCartPriceAfterDiscount}
        />

        {blockedMessage ? <div className="shop-alert">{blockedMessage}</div> : null}

        <button type="button" className="shop-btn shop-sum-cta" onClick={goCheckout}>
          إتمام الشراء
        </button>
        <Link to="/products" className="shop-link-center">متابعة التسوق</Link>
      </div>

      <div className="shop-mobile-bar">
        <div>
          <span>الإجمالي</span>
          <b>{formatMoney(total)}</b>
        </div>
        <button type="button" className="shop-btn" onClick={goCheckout}>
          إتمام الشراء
        </button>
      </div>
    </>
  );
};

export default CartCheckout;
