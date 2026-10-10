import { Link } from "react-router-dom";
import UserAllOrderItem from "./UserAllOrderItem";
import UserGetAllOrderHook from "./../../hook/user/user-get-all-order-hook";
import Pagination from "./../Uitily/Pagination";

const UserAllOrders = () => {
  const [, , paginate, orderData, onPress, loading, failed] = UserGetAllOrderHook();

  const handlePage = (page) => {
    window.scrollTo(0, 0);
    onPress(page);
  };

  const hasOrders = orderData && orderData.length >= 1;

  return (
    <div className="acct-main">
      <div className="acct-page-head">
        <div>
          <div className="acct-eyebrow">المشتريات</div>
          <div className="acct-title">طلباتي</div>
          <div className="acct-subtitle">راجع طلباتك السابقة وحالة الدفع والتوصيل لكل طلب</div>
        </div>
        {!loading && hasOrders && paginate?.numberOfPages >= 1 ? (
          <div className="acct-count-pill">
            صفحة {paginate.currentPage || 1} من {paginate.numberOfPages}
          </div>
        ) : null}
      </div>

      {loading ? (
        <div className="acct-state">جاري تحميل الطلبات...</div>
      ) : failed ? (
        <div className="acct-state acct-state-error">تعذّر تحميل الطلبات، حاول مرة أخرى لاحقًا</div>
      ) : hasOrders ? (
        orderData.map((orderItem, index) => (
          <UserAllOrderItem key={orderItem?._id || index} orderItem={orderItem} />
        ))
      ) : (
        <div className="acct-card acct-empty">
          <div className="acct-empty-t">لا توجد طلبات حتى الآن</div>
          <div className="acct-empty-d">عندما تُتمّ عملية شراء ستظهر طلباتك هنا</div>
          <Link to="/products" className="acct-btn acct-btn-link">تصفّح المنتجات</Link>
        </div>
      )}

      {!loading && !failed && paginate?.numberOfPages > 1 ? (
        <Pagination onPress={handlePage} pageCount={paginate.numberOfPages} />
      ) : null}
    </div>
  );
};

export default UserAllOrders;
