import { Link } from "react-router-dom";
import AddToCartHook from "../../hook/cart/add-to-cart-hook";
import StarsDisplay from "../Rate/StarsDisplay";
import ProductWishlistButton from "./ProductWishlistButton";
import { formatMoney } from "../Cart/cartHelpers";
import { getPriceInfo, isOutOfStock } from "./productHelpers";

// Product information card + mobile bottom action bar.
// No quantity selector: POST /cart adds one unit and takes no quantity.
const ProductText = ({ item, cat, brand, favProd }) => {
  const [colorClick, indexColor, addToCartHandel, busy, colorError] = AddToCartHook(item?._id, item);
  const { hasDiscount, final, price, save, percent } = getPriceInfo(item);
  const outOfStock = isOutOfStock(item);
  const colors = Array.isArray(item?.colors) ? item.colors : [];
  const rateQty = Number(item?.ratingsQuantity) || 0;
  const label = outOfStock ? "غير متوفر" : busy ? "جاري الإضافة..." : "أضف إلى العربة";

  return (
    <>
      <div className="sf-info">
        {cat?.name ? <div className="sf-info-cat">{cat.name}</div> : null}
        <h1 className="sf-info-title">{item?.title}</h1>

        <div className="sf-info-rate">
          {rateQty > 0 ? (
            <a href="#reviews">
              <StarsDisplay value={item?.ratingsAverage} />
              <b>{item?.ratingsAverage}</b>
              <span>({rateQty} تقييم)</span>
            </a>
          ) : (
            <span className="sf-muted">لا توجد تقييمات بعد</span>
          )}
        </div>

        {brand?.name ? (
          <div className="sf-info-brand">
            الماركة: <Link to={`/products/brand/${brand._id}`}>{brand.name}</Link>
          </div>
        ) : null}

        <div className="sf-info-price">
          <b>{formatMoney(final)}</b>
          {hasDiscount ? <s>{formatMoney(price)}</s> : null}
          {hasDiscount ? <span className="sf-save">وفّر {formatMoney(save)}{percent >= 1 ? ` · ${percent}%` : ""}</span> : null}
        </div>

        <div className={"sf-stock " + (outOfStock ? "out" : "in")}>
          {outOfStock
            ? "غير متوفر حاليًا"
            : typeof item?.quantity === "number"
              ? `متوفر — الكمية المتاحة ${item.quantity}`
              : "متوفر"}
        </div>

        {colors.length > 0 ? (
          <div className="sf-colors">
            <div className="sf-label">اللون</div>
            <div className="sf-swatches" role="radiogroup" aria-label="اللون">
              {colors.map((color, index) => (
                <button
                  type="button"
                  key={index}
                  className={"sf-swatch" + (indexColor === index ? " on" : "")}
                  style={{ backgroundColor: color }}
                  title={color}
                  aria-label={`اللون ${color}`}
                  aria-pressed={indexColor === index}
                  onClick={() => colorClick(index, color)}
                />
              ))}
            </div>
            {colorError ? <div className="sf-field-error">اختر اللون للمتابعة</div> : null}
          </div>
        ) : null}

        <div className="sf-actions">
          <button type="button" className="sf-btn" onClick={addToCartHandel} disabled={outOfStock || busy}>
            {label}
          </button>
          <ProductWishlistButton item={item} favProd={favProd} />
        </div>
      </div>

      <div className="sf-buybar">
        <ProductWishlistButton item={item} favProd={favProd} compact />
        <div className="sf-buybar-price">
          <b>{formatMoney(final)}</b>
          {hasDiscount ? <s>{formatMoney(price)}</s> : null}
        </div>
        <button type="button" className="sf-btn" onClick={addToCartHandel} disabled={outOfStock || busy}>
          {label}
        </button>
      </div>
    </>
  );
};

export default ProductText;
