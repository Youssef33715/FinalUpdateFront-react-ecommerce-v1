import { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import notify from "../../hook/useNotifaction";
import { createOrderCARD } from "../../redux/actions/checkoutAction";

// Card payment: creates the Stripe checkout session and sends the user to it
// in the same tab.
// Known limitation of the existing API (not changed here): the action sends the
// shipping address in the body of a GET request, which browsers do not send, so
// the backend never receives it for card orders.
const OrderPayCardHook = (cartID) => {
  const dispatch = useDispatch();
  const store = useStore();
  const [submitting, setSubmitting] = useState(false);

  const handelCreateOrderCARD = async (address) => {
    if (submitting) return;
    if (!cartID || cartID === "0") {
      notify("من فضلك اضف منتجات للعربه اولا", "warn");
      return;
    }
    if (!address || !address._id) {
      notify("من فضلك اختر عنوان اولا", "warn");
      return;
    }
    setSubmitting(true);
    await dispatch(
      createOrderCARD(cartID, {
        shippingAddress: {
          // address schema field is `detalis`; Order.shippingAddress uses `details`
          details: address.detalis || "",
          phone: address.phone || "",
          city: address.city || "",
          postalCode: address.postalCode || "",
        },
      }),
    );
    const res = store.getState().checkoutReducer.createOrderCard;
    const url = res && res.status === "success" && res.session && res.session.url;
    if (url) {
      notify("جاري تحويلك إلى صفحة الدفع...", "success");
      window.location.href = url;
    } else {
      setSubmitting(false);
      notify("فشل اكمال الطلب من فضلك حاول مره اخري", "warn");
    }
  };

  return [handelCreateOrderCARD, submitting];
};

export default OrderPayCardHook;
