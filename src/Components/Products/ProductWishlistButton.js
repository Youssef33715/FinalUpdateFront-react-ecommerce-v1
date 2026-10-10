import favOnImg from "../../images/fav-on.png";
import ProductCardHook from "../../hook/products/product-card-hook";

// Wishlist heart for the product page. Same ProductCardHook as the product card.
const ProductWishlistButton = ({ item, favProd, compact = false }) => {
  const [, , handelFav, favImg] = ProductCardHook(item, favProd);
  const isFav = favImg === favOnImg;
  return (
    <button
      type="button"
      className={"sf-fav-btn" + (compact ? " compact" : "") + (isFav ? " on" : "")}
      onClick={handelFav}
      aria-pressed={isFav}
      aria-label={isFav ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
      title={isFav ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7-4.6-9.3-9A5.4 5.4 0 0112 6.3 5.4 5.4 0 0121.3 12C19 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
};

export default ProductWishlistButton;
