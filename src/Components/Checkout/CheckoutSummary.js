import CartTotals from "../Cart/CartTotals";
import { formatMoney, productIdOf } from "../Cart/cartHelpers";

// Order summary for the payment page. Same totals component as the cart page.
const CheckoutSummary = ({ cartItems, products, totalCartPrice, totalCartPriceAfterDiscount, children }) => {
  return (
    <div className="shop-card shop-summary">
      <div className="shop-summary-title">ملخص الطلب</div>
      <div className="shop-mini-list">
        {cartItems.map((item) => {
          const entry = products[productIdOf(item)];
          const product = entry?.status === "ok" ? entry.data : null;
          const qty = Number(item?.quantity) || 1;
          const price = Number(item?.price);
          return (
            <div className="shop-mini" key={item._id}>
              {product?.imageCover ? (
                <img src={product.imageCover} alt={product.title || ""} />
              ) : (
                <div className="shop-mini-empty" />
              )}
              <div className="shop-mini-info">
                <div className="shop-mini-title">
                  {product ? product.title : entry?.status === "missing" ? "منتج غير متاح" : "..."}
                </div>
                <div className="shop-mini-sub">
                  {qty} × {isNaN(price) ? "—" : formatMoney(price)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CartTotals
        totalCartPrice={totalCartPrice}
        totalCartPriceAfterDiscount={totalCartPriceAfterDiscount}
      />
      {children}
    </div>
  );
};

export default CheckoutSummary;
