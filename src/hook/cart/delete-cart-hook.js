import { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import {
  clearAllCartItem,
  deleteCartItem,
  getAllUserCartItems,
  updateCartItem,
} from "../../redux/actions/cartAction";
import notify from "../../hook/useNotifaction";

const isSuccessBody = (r) =>
  !!r && typeof r.status === "string" && r.status.toLowerCase() === "success";

const DISCOUNT_RESET_MSG = "تم تحديث العربة — أعد تطبيق كود الخصم لتفعيل الخصم";

// Used by CartItem (pass the cart row) and by the cart page for "clear cart"
// (no row). After every action the cart is refetched from the store action,
// so the page and the navbar badge update without a reload.
// Returns: [clearCart, show, close, open, deleteItem, updateQuantity, busy]
const DeleteCartHook = (item) => {
  const dispatch = useDispatch();
  const store = useStore();
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refresh = () => dispatch(getAllUserCartItems());

  // DELETE /cart answers 204, which the existing action stores as "" on success
  const handelDeleteCart = async () => {
    if (busy) return;
    setBusy(true);
    await dispatch(clearAllCartItem());
    const res = store.getState().cartReducer.clearCart;
    setShow(false);
    if (res === "") {
      notify("تم مسح العربة", "success");
    } else {
      notify("تعذّر مسح العربة، حاول مرة أخرى", "error");
    }
    await refresh();
    setBusy(false);
  };

  // `hadDiscount`: the backend clears an applied discount whenever the cart changes
  const handelDeleteItem = async (hadDiscount) => {
    if (busy || !item) return;
    setBusy(true);
    await dispatch(deleteCartItem(item._id));
    const res = store.getState().cartReducer.deleteItem;
    setShow(false);
    if (isSuccessBody(res)) {
      notify("تم حذف المنتج من العربة", "success");
      if (hadDiscount) notify(DISCOUNT_RESET_MSG, "warn");
    } else {
      notify("تعذّر حذف المنتج، حاول مرة أخرى", "error");
    }
    await refresh();
    setBusy(false);
  };

  const handelUpdateCart = async (quantity, hadDiscount) => {
    if (busy || !item) return;
    setBusy(true);
    await dispatch(updateCartItem(item._id, { quantity }));
    const res = store.getState().cartReducer.updateItem;
    if (isSuccessBody(res)) {
      if (hadDiscount) notify(DISCOUNT_RESET_MSG, "warn");
    } else {
      notify("تعذّر تحديث الكمية، حاول مرة أخرى", "error");
    }
    await refresh();
    setBusy(false);
  };

  return [handelDeleteCart, show, handleClose, handleShow, handelDeleteItem, handelUpdateCart, busy];
};

export default DeleteCartHook;
