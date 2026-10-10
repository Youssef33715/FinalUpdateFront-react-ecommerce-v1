import { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import notify from "../../hook/useNotifaction";
import {
  applayCouponCart,
  getAllUserCartItems,
} from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";

const ApplayCouponHook = (cartItems) => {
  const dispatch = useDispatch();
  const store = useStore();
  const navigate = useNavigate();
  const [couponName, setCouponName] = useState("");
  const [applying, setApplying] = useState(false);

  const onChangeCoupon = (e) => {
    setCouponName(e);
  };

  const handelSubmitCoupon = async () => {
    if (applying) return;
    if (couponName.trim() === "") {
      notify("من فضلك ادخل اسم الكوبون", "warn");
      return;
    }
    setApplying(true);
    await dispatch(applayCouponCart({ coupon: couponName.trim() }));
    const res = store.getState().cartReducer.applayCoupon;
    if (res && typeof res.status === "string" && res.status.toLowerCase() === "success") {
      notify("تم تطبيق الكوبون بنجاح", "success");
      setCouponName("");
      // refetch the cart (no page reload) so totals and the navbar update
      await dispatch(getAllUserCartItems());
    } else {
      notify("هذا الكوبون غير صحيح او منتهي الصلاحيه", "warn");
    }
    setApplying(false);
  };

  const handelCheckout = () => {
    if (cartItems.length >= 1) {
      navigate("/order/paymethoud");
    } else {
      notify("من فضلك اضف منتجات للعربه اولا ", "warn");
    }
  };

  return [couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout, applying];
};

export default ApplayCouponHook;
