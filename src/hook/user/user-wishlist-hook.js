import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import notify from "../useNotifaction";
import {
  getProductWishList,
  removeProductFromWishList,
} from "../../redux/actions/wishListAction";
import {
  addProductToCart,
  getAllUserCartItems,
} from "../../redux/actions/cartAction";

const isSuccessBody = (r) =>
  !!r && typeof r.status === "string" && r.status.toLowerCase() === "success";

// Single source of truth for the wishlist page: one fetch, items always come
// from the store, so removing an item refetches and the UI updates without a reload.
const UserWishlistHook = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const res = useSelector((state) => state.addToWishListReducer.allWishList);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getProductWishList());
      setLoading(false);
    };
    get();
  }, [dispatch]);

  const items = res && Array.isArray(res.data) ? res.data.filter(Boolean) : [];
  const failed = !loading && !(res && Array.isArray(res.data));

  const removeItem = async (productId) => {
    if (!productId || busyId) return;
    setBusyId(productId);
    await dispatch(removeProductFromWishList(productId));
    const removed = store.getState().addToWishListReducer.removeWishList;
    await dispatch(getProductWishList());
    setBusyId(null);
    if (isSuccessBody(removed)) {
      notify("تم حذف المنتج من المفضلة", "warn");
    } else {
      notify("تعذّر حذف المنتج من المفضلة", "error");
    }
  };

  // Reuses the existing addProductToCart action (POST /api/v1/cart).
  const addToCart = async (item) => {
    if (!item?._id || busyId) return;
    setBusyId(item._id);
    await dispatch(addProductToCart({ productId: item._id, color: "" }));
    const added = store.getState().cartReducer.addToCart;
    if (added && added.status === 200) {
      // refresh the cart badge in the navbar (it reads the same store key)
      await dispatch(getAllUserCartItems());
      notify("تمت إضافة المنتج إلى السلة", "success");
    } else {
      notify("تعذّرت إضافة المنتج إلى السلة", "error");
    }
    setBusyId(null);
  };

  return [items, loading, failed, busyId, removeItem, addToCart];
};

export default UserWishlistHook;
