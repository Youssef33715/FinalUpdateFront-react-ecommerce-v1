import favoff from "../../images/fav-off.png";
import favon from "../../images/fav-on.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import notify from "../../hook/useNotifaction";
import {
  addProductToWishList,
  removeProductFromWishList,
} from "../../redux/actions/wishListAction";

const ProductCardHook = (item, favProd) => {
  const dispatch = useDispatch();
  const [favImg, setFavImg] = useState(favoff);

  let Fav = favProd?.some((fitem) => fitem === item?._id) || false;

  const [loadingAdd, setLoadingAdd] = useState(true);
  const [loadingRemove, setLoadingRemove] = useState(true);
  const [isFav, setIsFav] = useState(Fav);

  useEffect(() => {
    setIsFav(favProd?.some((fitem) => fitem === item?._id) || false);
  }, [favProd, item?._id]);

  const handelFav = () => {
    if (isFav) {
      removeFromWishListData();
    } else {
      addToWishListData();
    }
  };

  useEffect(() => {
    if (isFav) {
      setFavImg(favon);
    } else {
      setFavImg(favoff);
    }
  }, [isFav]);

  const resAdd = useSelector((state) => state.addToWishListReducer.addWishList);
  const resRemove = useSelector(
    (state) => state.addToWishListReducer.removeWishList,
  );

  // دالة الإضافة
  const addToWishListData = async () => {
    if (!item?._id) return;
    setIsFav(true);
    setFavImg(favon);
    setLoadingAdd(true);
    await dispatch(
      addProductToWishList({
        productId: item._id,
      }),
    );
    setLoadingAdd(false);
  };

  // دالة الحذف
  const removeFromWishListData = async () => {
    if (!item?._id) return;
    setIsFav(false);
    setFavImg(favoff);
    setLoadingRemove(true);
    await dispatch(removeProductFromWishList(item._id));
    setLoadingRemove(false);
  };

  // 🟢 تنبيه الإضافة
  useEffect(() => {
    if (loadingAdd === false) {
      if (
        resAdd &&
        (resAdd.status === 200 ||
          resAdd.status === 201 ||
          resAdd.status === "success" ||
          resAdd.data?.status === "success")
      ) {
        notify("تمت إضافة المنتج للمفضلة بنجاح", "success");
      } else if (
        resAdd &&
        (resAdd.status === 401 || resAdd.data?.status === 401)
      ) {
        notify("أنت غير مسجل", "error");
      }
    }
  }, [loadingAdd]);

  // 🟡 تنبيه الحذف )
  useEffect(() => {
    if (loadingRemove === false) {
      if (
        resRemove &&
        (resRemove.status === "success" ||
          resRemove.status === 200 ||
          resRemove.data?.status === "success")
      ) {
        notify("تم حذف المنتج من المفضلة بنجاح", "warn");
      } else if (
        resRemove &&
        (resRemove.status === 401 || resRemove.data?.status === 401)
      ) {
        notify("أنت غير مسجل", "error");
      } else {
        notify("تم حذف المنتج من المفضلة بنجاح", "warn");
      }
    }
  }, [loadingRemove]);

  return [removeFromWishListData, addToWishListData, handelFav, favImg];
};

export default ProductCardHook;
