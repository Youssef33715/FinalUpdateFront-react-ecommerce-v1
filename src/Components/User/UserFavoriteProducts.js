import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserWishlistCard from "./UserWishlistCard";
import UserWishlistHook from "../../hook/user/user-wishlist-hook";

const UserFavoriteProducts = () => {
  const [items, loading, failed, busyId, removeItem, addToCart] = UserWishlistHook();

  return (
    <div className="acct-main">
      <div className="acct-page-head">
        <div>
          <div className="acct-eyebrow">المشتريات</div>
          <div className="acct-title">المفضلة</div>
          <div className="acct-subtitle">المنتجات التي حفظتها لتعود إليها لاحقًا</div>
        </div>
        {!loading && !failed && items.length > 0 ? (
          <div className="acct-count-pill">{items.length} منتج</div>
        ) : null}
      </div>

      {loading ? (
        <div className="acct-state">جاري تحميل المفضلة...</div>
      ) : failed ? (
        <div className="acct-state acct-state-error">تعذّر تحميل قائمة المفضلة، حاول مرة أخرى لاحقًا</div>
      ) : items.length === 0 ? (
        <div className="acct-card acct-empty">
          <div className="acct-empty-t">قائمة المفضلة فارغة</div>
          <div className="acct-empty-d">اضغط على القلب في أي منتج لحفظه هنا</div>
          <Link to="/products" className="acct-btn acct-btn-link">تصفّح المنتجات</Link>
        </div>
      ) : (
        <div className="acct-wish-grid">
          {items.map((item) => (
            <UserWishlistCard
              key={item._id}
              item={item}
              busy={busyId === item._id}
              disabled={!!busyId}
              onRemove={removeItem}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserFavoriteProducts;
