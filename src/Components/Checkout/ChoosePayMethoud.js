import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VeiwAddressHook from "../../hook/user/veiw-address-hook";
import OrderPayCashHook from "../../hook/Checkout/order-pay-cash-hook";
import OrderPayCardHook from "../../hook/Checkout/order-pay-card-hook";
import GetAllUserCart from "../../hook/cart/get-all-user-cart";
import UseCartProductsHook from "../../hook/cart/use-cart-products-hook";
import notify from "../../hook/useNotifaction";
import CheckoutSummary from "./CheckoutSummary";
import { cartIssues, cartTotals, formatMoney, productIdOf } from "../Cart/cartHelpers";

const ChoosePayMethoud = () => {
  // one cart fetch for the whole page
  const [, cartItems, totalCartPrice, , totalCartPriceAfterDiscount, cartID, cartLoading] =
    GetAllUserCart();
  const [res, addressLoading] = VeiwAddressHook();
  const products = UseCartProductsHook(cartItems);
  const [handelCreateOrderCash, payingCash] = OrderPayCashHook(cartID);
  const [handelCreateOrderCARD, payingCard] = OrderPayCardHook(cartID);

  const [type, setType] = useState("");
  const [addressId, setAddressId] = useState("");
  const [errors, setErrors] = useState({ address: false, method: false });

  const addresses = res && Array.isArray(res.data) ? res.data : [];
  const addressesFailed = !addressLoading && !(res && Array.isArray(res.data));
  const selectedAddress = addresses.find((a) => a._id === addressId) || null;
  const submitting = payingCash || payingCard;
  const issues = cartIssues(cartItems, products);
  const stillChecking = cartItems.some((i) => products[productIdOf(i)]?.status === "loading");
  const { total } = cartTotals(totalCartPrice, totalCartPriceAfterDiscount);

  // a single saved address is pre-selected
  useEffect(() => {
    if (!addressId && addresses.length === 1) setAddressId(addresses[0]._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses.length]);

  const chooseAddress = (id) => {
    setAddressId(id);
    setErrors((e) => ({ ...e, address: false }));
  };
  const changeMathoud = (e) => {
    setType(e.target.value);
    setErrors((er) => ({ ...er, method: false }));
  };

  const handelPay = () => {
    const next = { address: !selectedAddress, method: type !== "CARD" && type !== "CASH" };
    setErrors(next);
    if (next.address || next.method) return;
    if (issues.length > 0) {
      notify("بعض المنتجات غير متاحة أو كميتها أكبر من المتاح. راجع العربة أولا.", "warn");
      return;
    }
    if (stillChecking) {
      notify("جاري التحقق من توفر المنتجات، حاول بعد لحظات", "warn");
      return;
    }
    if (type === "CARD") {
      handelCreateOrderCARD(selectedAddress);
    } else {
      handelCreateOrderCash(selectedAddress);
    }
  };

  const hasItems = cartItems.length >= 1;

  return (
    <div className="shop-page">
      <div className="shop-head">
        <div>
          <div className="shop-eyebrow">إتمام الشراء</div>
          <h1 className="shop-title">الشحن والدفع</h1>
          <div className="shop-steps">
            <span className="shop-step done"><i>✓</i>العربة</span>
            <span className="shop-step-line" />
            <span className="shop-step current"><i>2</i>الشحن والدفع</span>
          </div>
        </div>
      </div>

      {cartLoading ? (
        <div className="shop-state">جاري تحميل بيانات الطلب...</div>
      ) : !hasItems ? (
        <div className="shop-card shop-empty">
          <div className="shop-empty-t">عربة التسوق فارغة</div>
          <div className="shop-empty-d">أضف منتجات إلى العربة أولًا لإتمام الشراء</div>
          <Link to="/products" className="shop-btn shop-btn-inline">تصفّح المنتجات</Link>
        </div>
      ) : (
        <div className="shop-layout">
          <div className="shop-checkout-main">
            {issues.length > 0 ? (
              <div className="shop-alert shop-alert-block">
                بعض المنتجات في عربتك غير متاحة أو كميتها أكبر من المتاح.{" "}
                <Link to="/cart">مراجعة العربة</Link>
              </div>
            ) : null}

            <div className={"shop-card shop-section" + (errors.address ? " has-error" : "")}>
              <div className="shop-section-head">
                <div className="shop-section-title">عنوان الشحن</div>
                <Link to="/user/add-address" className="shop-link-sm">+ إضافة عنوان جديد</Link>
              </div>

              {addressLoading ? (
                <div className="shop-inline-state">جاري تحميل العناوين...</div>
              ) : addressesFailed ? (
                <div className="shop-inline-state shop-inline-error">تعذّر تحميل العناوين، حاول مرة أخرى لاحقًا</div>
              ) : addresses.length === 0 ? (
                <div className="shop-empty-inline">
                  <div className="shop-empty-t">لا توجد عناوين محفوظة</div>
                  <div className="shop-empty-d">أضف عنوان شحن لتتمكن من إتمام الطلب</div>
                  <Link to="/user/add-address" className="shop-btn shop-btn-inline">إضافة عنوان</Link>
                </div>
              ) : (
                <div role="radiogroup" aria-label="عنوان الشحن">
                  {addresses.map((a) => {
                    const place = [a.city, a.postalCode].filter(Boolean).join(" — ");
                    return (
                      <label key={a._id} className={"shop-option" + (addressId === a._id ? " on" : "")}>
                        <input
                          type="radio"
                          name="address"
                          value={a._id}
                          checked={addressId === a._id}
                          onChange={() => chooseAddress(a._id)}
                        />
                        <span className="shop-radio" aria-hidden="true" />
                        <span className="shop-option-body">
                          <b>{a.alias}</b>
                          {a.detalis ? <span className="shop-option-text">{a.detalis}</span> : <span className="shop-muted">لا توجد تفاصيل محفوظة لهذا العنوان</span>}
                          {place ? <span className="shop-option-sub">{place}</span> : null}
                          {a.phone ? <span className="shop-option-sub">{a.phone}</span> : null}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
              {errors.address ? <div className="shop-field-error">اختر عنوان الشحن للمتابعة</div> : null}
            </div>

            <div className={"shop-card shop-section" + (errors.method ? " has-error" : "")}>
              <div className="shop-section-head">
                <div className="shop-section-title">طريقة الدفع</div>
              </div>
              <div role="radiogroup" aria-label="طريقة الدفع">
                <label className={"shop-option" + (type === "CASH" ? " on" : "")}>
                  <input type="radio" name="group" id="group2" value="CASH" checked={type === "CASH"} onChange={changeMathoud} />
                  <span className="shop-radio" aria-hidden="true" />
                  <span className="shop-option-ic" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></svg>
                  </span>
                  <span className="shop-option-body">
                    <b>الدفع عند الاستلام</b>
                    <span className="shop-option-sub">تدفع قيمة الطلب عند وصوله</span>
                  </span>
                </label>
                <label className={"shop-option" + (type === "CARD" ? " on" : "")}>
                  <input type="radio" name="group" id="group1" value="CARD" checked={type === "CARD"} onChange={changeMathoud} />
                  <span className="shop-radio" aria-hidden="true" />
                  <span className="shop-option-ic" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                  </span>
                  <span className="shop-option-body">
                    <b>الدفع عن طريق البطاقه الائتمانية</b>
                    <span className="shop-option-sub">ستنتقل إلى صفحة الدفع الآمنة لإتمام العملية</span>
                  </span>
                </label>
              </div>
              {errors.method ? <div className="shop-field-error">اختر طريقة الدفع للمتابعة</div> : null}
            </div>
          </div>

          <CheckoutSummary
            cartItems={cartItems}
            products={products}
            totalCartPrice={totalCartPrice}
            totalCartPriceAfterDiscount={totalCartPriceAfterDiscount}
          >
            <button type="button" className="shop-btn shop-sum-cta" onClick={handelPay} disabled={submitting}>
              {submitting ? "جاري التنفيذ..." : type === "CARD" ? "المتابعة إلى الدفع" : "تأكيد الطلب"}
            </button>
            <Link to="/cart" className="shop-link-center">العودة إلى العربة</Link>
          </CheckoutSummary>

          <div className="shop-mobile-bar">
            <div>
              <span>الإجمالي</span>
              <b>{formatMoney(total)}</b>
            </div>
            <button type="button" className="shop-btn" onClick={handelPay} disabled={submitting}>
              {submitting ? "جاري التنفيذ..." : type === "CARD" ? "المتابعة إلى الدفع" : "تأكيد الطلب"}
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ChoosePayMethoud;
