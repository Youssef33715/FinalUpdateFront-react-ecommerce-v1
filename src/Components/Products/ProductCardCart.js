import { Link } from "react-router-dom";
import { useAddToCart } from "../../hook/cart/add-to-cart-flow";
import { isOutOfStock } from "./productHelpers";

// Optional quick action on the Products page card (opt-in via showAddToCart).
// Products with colors need a color choice, so they go to the product page.
const ProductCardCart = ({ item }) => {
  const [addToCart, busy] = useAddToCart();
  const hasColors = Array.isArray(item?.colors) && item.colors.length > 0;

  if (isOutOfStock(item)) {
    return <button type="button" className="sf-card-cta" disabled>غير متوفر</button>;
  }
  if (hasColors) {
    return <Link to={`/products/${item._id}`} className="sf-card-cta sf-card-cta-ghost">اختر اللون</Link>;
  }
  return (
    <button type="button" className="sf-card-cta" disabled={busy} onClick={() => addToCart(item._id, "")}>
      {busy ? "جاري الإضافة..." : "أضف إلى العربة"}
    </button>
  );
};

export default ProductCardCart;
