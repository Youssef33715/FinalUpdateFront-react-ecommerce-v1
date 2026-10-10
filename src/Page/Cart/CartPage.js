import { Container, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItem from "../../Components/Cart/CartItem";
import CartCheckout from "../../Components/Cart/CartCheckout";
import GetAllUserCart from "../../hook/cart/get-all-user-cart";
import DeleteCartHook from "../../hook/cart/delete-cart-hook";
import UseCartProductsHook from "../../hook/cart/use-cart-products-hook";
import {
  cartIssues,
  cartTotals,
  productIdOf,
  productsCountLabel,
} from "../../Components/Cart/cartHelpers";

const CartPage = () => {
  const [
    itemsNum,
    cartItems,
    totalCartPrice,
    ,
    totalCartPriceAfterDiscount,
    ,
    loading,
  ] = GetAllUserCart();
  const [handelClearCart, showClear, closeClear, openClear, , , clearing] =
    DeleteCartHook();
  const products = UseCartProductsHook(cartItems);

  const hasItems = cartItems?.length >= 1;
  const { hasDiscount } = cartTotals(totalCartPrice, totalCartPriceAfterDiscount);
  const blocked = cartIssues(cartItems, products).length > 0;
  const blockedMessage = blocked
    ? "بعض المنتجات غير متاحة أو كميتها أكبر من المتاح. عدّل الكميات أو احذفها للمتابعة."
    : "";

  return (
    <Container className="shop-container">
      <div className="shop-page">
        <div className="shop-head">
          <div>
            <div className="shop-eyebrow">التسوق</div>
            <h1 className="shop-title">عربة التسوق</h1>
            {!loading && hasItems ? (
              <div className="shop-subtitle">{productsCountLabel(itemsNum || cartItems.length)} في عربتك</div>
            ) : null}
          </div>
          {!loading && hasItems ? (
            <button type="button" className="shop-text-danger" onClick={openClear} disabled={clearing}>
              مسح العربة
            </button>
          ) : null}
        </div>

        <Modal show={showClear} onHide={closeClear} centered>
          <Modal.Header>
            <Modal.Title>
              <div className="font">مسح العربة</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="font">هل انت متاكد من مسح جميع المنتجات من العربة؟</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={closeClear}>
              تراجع
            </Button>
            <Button variant="dark" onClick={handelClearCart}>
              امسح العربة
            </Button>
          </Modal.Footer>
        </Modal>

        {loading ? (
          <div className="shop-state">جاري تحميل العربة...</div>
        ) : hasItems ? (
          <div className="shop-layout">
            <div className="shop-card shop-items">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  entry={products[productIdOf(item)]}
                  hadDiscount={hasDiscount}
                />
              ))}
            </div>
            <CartCheckout
              cartItems={cartItems}
              totalCartPrice={totalCartPrice}
              totalCartPriceAfterDiscount={totalCartPriceAfterDiscount}
              blockedMessage={blockedMessage}
            />
          </div>
        ) : (
          <div className="shop-card shop-empty">
            <div className="shop-empty-ic">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.6 12.2a1 1 0 001 .8h8.9a1 1 0 001-.8L20 7H6" />
              </svg>
            </div>
            <div className="shop-empty-t">عربة التسوق فارغة</div>
            <div className="shop-empty-d">أضف منتجات إلى العربة لتظهر هنا وتتمكن من إتمام الشراء</div>
            <Link to="/products" className="shop-btn shop-btn-inline">تصفّح المنتجات</Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </Container>
  );
};

export default CartPage;
