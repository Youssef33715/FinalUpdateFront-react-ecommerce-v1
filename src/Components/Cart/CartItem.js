import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteCartHook from "../../hook/cart/delete-cart-hook";
import { formatMoney, itemIssue, productIdOf } from "./cartHelpers";

const CartItem = ({ item, entry, hadDiscount }) => {
  const [, show, handleClose, handleShow, handelDeleteItem, handelUpdateCart, busy] =
    DeleteCartHook(item);

  const pid = productIdOf(item);
  const product = entry?.status === "ok" ? entry.data : null;
  const loadingProduct = !entry || entry.status === "loading";
  const missing = entry?.status === "missing";
  const quantity = Number(item?.quantity) || 1;
  const unitPrice = Number(item?.price);
  const hasPrice = item?.price !== undefined && item?.price !== null && !isNaN(unitPrice);
  const stock = typeof product?.quantity === "number" ? product.quantity : null;
  const issue = itemIssue(item, entry);

  // Stock is the frontend maximum. Without product data (deleted / failed to load) quantity can't grow.
  const canIncrease = !busy && !!product && (stock === null || quantity < stock);
  const canDecrease = !busy && quantity > 1;
  const atMax = !!product && stock !== null && quantity >= stock && stock > 0;

  const thumb = product?.imageCover ? (
    <img className="shop-item-img" src={product.imageCover} alt={product.title || ""} />
  ) : (
    <div className={"shop-item-img shop-item-img-empty" + (loadingProduct ? " is-loading" : "")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M21 16l-5-5-8 8" />
      </svg>
    </div>
  );

  const title = product ? (
    <Link to={`/products/${pid}`} className="shop-item-title">{product.title}</Link>
  ) : (
    <div className="shop-item-title shop-muted">
      {loadingProduct ? "جاري تحميل بيانات المنتج..." : missing ? "منتج غير متاح" : "تعذّر تحميل بيانات المنتج"}
    </div>
  );

  return (
    <div className={"shop-item" + (busy ? " is-busy" : "")}>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <div className="font"> تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انت متاكد من حذف المنتج من العربه </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button variant="dark" onClick={() => handelDeleteItem(hadDiscount)}>
            احذف
          </Button>
        </Modal.Footer>
      </Modal>

      {product ? <Link to={`/products/${pid}`} className="shop-item-imgwrap">{thumb}</Link> : thumb}

      <div className="shop-item-main">
        <div className="shop-item-top">
          <div className="shop-item-info">
            {title}
            <div className="shop-item-meta">
              {product?.category?.name ? <span>{product.category.name}</span> : null}
              {item?.color ? (
                <span className="shop-swatch" title={item.color} style={{ backgroundColor: item.color }} />
              ) : null}
            </div>
          </div>
          <button type="button" className="shop-icon-btn" onClick={handleShow} disabled={busy} aria-label="إزالة المنتج من العربة" title="إزالة">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 14h10l1-14" />
            </svg>
          </button>
        </div>

        {issue ? <div className="shop-item-issue">{issue}</div> : atMax ? <div className="shop-item-note">وصلت للحد الأقصى المتاح</div> : null}

        <div className="shop-item-bottom">
          <div className="shop-qty" role="group" aria-label="الكمية">
            <button type="button" onClick={() => handelUpdateCart(quantity + 1, hadDiscount)} disabled={!canIncrease} aria-label="زيادة الكمية">+</button>
            <span>{quantity}</span>
            <button type="button" onClick={() => handelUpdateCart(quantity - 1, hadDiscount)} disabled={!canDecrease} aria-label="تقليل الكمية">−</button>
          </div>
          {hasPrice ? (
            <div className="shop-item-price">
              <b>{formatMoney(unitPrice * quantity)}</b>
              {quantity > 1 ? <span>{formatMoney(unitPrice)} للقطعة</span> : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
