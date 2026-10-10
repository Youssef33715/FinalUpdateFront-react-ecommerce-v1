import { useState } from "react";
import notify from "../../hook/useNotifaction";
import { useAddToCart } from "./add-to-cart-flow";

// Product details page. The product model stores colors in `colors`.
// Returns [colorClick, indexColor, addToCartHandel, busy, colorError]
const AddToCartHook = (prodID, item) => {
  const [addToCart, busy] = useAddToCart();
  const [indexColor, setIndexColor] = useState("");
  const [colorText, setColorText] = useState("");
  const [colorError, setColorError] = useState(false);

  const colors = Array.isArray(item?.colors) ? item.colors : [];
  const outOfStock = typeof item?.quantity === "number" && item.quantity <= 0;

  const colorClick = (index, color) => {
    setIndexColor(index);
    setColorText(color);
    setColorError(false);
  };

  const addToCartHandel = async () => {
    if (outOfStock) {
      notify("هذا المنتج غير متوفر حاليًا", "warn");
      return;
    }
    if (colors.length >= 1 && colorText === "") {
      setColorError(true);
      notify("من فضلك اختر اللون اولا للمنتج", "warn");
      return;
    }
    await addToCart(prodID, colors.length >= 1 ? colorText : "");
  };

  return [colorClick, indexColor, addToCartHandel, busy, colorError];
};

export default AddToCartHook;
