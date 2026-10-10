import { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "../../hook/useNotifaction";
import { createOrderCach } from "../../redux/actions/checkoutAction";
import { getAllUserCartItems } from "../../redux/actions/cartAction";

// Cash on delivery. `cartID` comes from the page (single cart fetch) and the
// selected `address` is one of the user's real saved addresses.
// The address schema spells the field `detalis`; Order.shippingAddress uses `details`.
const OrderPayCashHook = (cartID) => {
  const dispatch = useDispatch();
  const store = useStore();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handelCreateOrderCash = async (address) => {
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
      createOrderCach(cartID, {
        shippingAddress: {
          details: address.detalis || "",
          phone: address.phone || "",
          city: address.city || "",
          postalCode: address.postalCode || "",
        },
      }),
    );
    // Success is the 201 axios response; a failed request is stored as an
    // error response (4xx/5xx), which also has a `.data`, so check the status code.
    const res = store.getState().checkoutReducer.createOrderCash;
    if (res && res.status === 201) {
      notify("تم انشاء طلبك بنجاح", "success");
      await dispatch(getAllUserCartItems()); // the backend deleted the cart; refresh the navbar badge
      setTimeout(() => {
        navigate("/user/allorders");
      }, 1200);
    } else {
      setSubmitting(false);
      notify("فشل اكمال الطلب من فضلك حاول مره اخري", "warn");
    }
  };

  return [handelCreateOrderCash, submitting];
};

export default OrderPayCashHook;
