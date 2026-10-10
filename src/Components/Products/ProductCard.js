import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import favOnImg from "../../images/fav-on.png";
import ProductCardHook from "../../hook/products/product-card-hook";
import { formatMoney } from "../Cart/cartHelpers";
import { getPriceInfo, isOutOfStock } from "./productHelpers";
import ProductCardCart from "./ProductCardCart";

// Shared product card (public props unchanged: item, favProd).
// Optional: `bare` (no bootstrap Col wrapper, for CSS-grid layouts) and
// `showAddToCart` (quick add button). Wishlist behavior still comes from ProductCardHook.
const ProductCard = ({ item, favProd, bare = false, showAddToCart = false }) => {
  const [, , handelFav, favImg] = ProductCardHook(item, favProd);
  const isFav = favImg === favOnImg;
  const { hasDiscount, final, price, percent } = getPriceInfo(item);
  const outOfStock = isOutOfStock(item);
  const hasRating = Number(item?.ratingsQuantity) > 0;

  const card = (
    <div className={"sf-card" + (bare ? "" : " sf-card-in-col")}>
      <div className="sf-card-media">
        <Link to={`/products/${item?._id}`} className="sf-card-img" aria-label={item?.title}>
          {item?.imageCover ? (
            <img src={item.imageCover} alt={item?.title || ""} loading="lazy" />
          ) : (
            <span className="sf-card-noimg" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M21 16l-5-5-8 8" />
              </svg>
            </span>
          )}
        </Link>
        {hasDiscount && percent >= 1 ? <span className="sf-badge">-{percent}%</span> : null}
        {outOfStock ? <span className="sf-badge sf-badge-oos">غير متوفر</span> : null}
        <button
          type="button"
          className={"sf-heart" + (isFav ? " on" : "")}
          onClick={handelFav}
          aria-pressed={isFav}
          aria-label={isFav ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
            <path d="M12 21s-7-4.6-9.3-9A5.4 5.4 0 0112 6.3 5.4 5.4 0 0121.3 12C19 16.4 12 21 12 21z" />
          </svg>
        </button>
      </div>
      <div className="sf-card-body">
        <Link to={`/products/${item?._id}`} className="sf-card-title">{item?.title}</Link>
        <div className="sf-card-rate">
          {hasRating ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5L9 8.9z" /></svg>
              {item?.ratingsAverage || 0} ({item?.ratingsQuantity})
            </>
          ) : null}
        </div>
        <div className="sf-card-price">
          <b>{formatMoney(final)}</b>
          {hasDiscount ? <s>{formatMoney(price)}</s> : null}
        </div>
        {showAddToCart ? <ProductCardCart item={item} /> : null}
      </div>
    </div>
  );

  return bare ? card : (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
      {card}
    </Col>
  );
};

export default ProductCard;
