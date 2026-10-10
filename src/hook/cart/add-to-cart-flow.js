import { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import notify from "../useNotifaction";
import { addProductToCart, getAllUserCartItems } from "../../redux/actions/cartAction";

// Shared "add one product to the cart" flow (POST /cart adds a single unit).
// - success: the cart is refetched from the store action, so the navbar badge
//   updates without a page reload
// - the login message is shown only for a real 401 from the API
export const useAddToCart = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const [busy, setBusy] = useState(false);

  const addToCart = async (productId, color = "") => {
    if (busy || !productId) return false;
    setBusy(true);
    await dispatch(addProductToCart({ productId, color }));
    const res = store.getState().cartReducer.addToCart;
    let ok = false;
    if (res && res.status === 200) {
      ok = true;
      notify("تمت اضافه المنتج للعربه بنجاح", "success");
      await dispatch(getAllUserCartItems());
    } else if (res && res.status === 401) {
      notify("قم بتسجيل الدخول اولا", "warn");
    } else {
      notify("تعذّرت إضافة المنتج إلى العربة، حاول مرة أخرى", "error");
    }
    setBusy(false);
    return ok;
  };

  return [addToCart, busy];
};
