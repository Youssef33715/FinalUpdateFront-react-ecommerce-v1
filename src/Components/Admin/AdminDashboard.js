import { Link } from "react-router-dom";
import AdminDashboardHook from "../../hook/admin/admin-dashboard-hook";
import AdminEmptyState from "./AdminEmptyState";
import { formatDate, orderStatus } from "./adminFormat";

const icons = {
  products: <path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8" />,
  orders: <path d="M3 6h18M6 6l1 14h10l1-14M9 10v6M15 10v6" />,
  users: <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M10 11a4 4 0 100-8 4 4 0 000 8z" />,
  coupons: <path d="M20 12a8 8 0 11-16 0 8 8 0 0116 0zM9 12l1.8 1.8L15 10" />,
};

const Kpi = ({ icon, label, value, loading }) => (
  <div className="adm-kpi">
    <div className="adm-ic">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        {icons[icon]}
      </svg>
    </div>
    <div>
      <div className="adm-lb">{label}</div>
      <div className="adm-vl">{loading ? "—" : value ?? 0}</div>
    </div>
  </div>
);

// Every number below comes from real API responses; nothing is mocked.
const AdminDashboard = () => {
  const {
    loading, productsCount, ordersCount, usersCount, couponsCount,
    recentOrders, recentProducts, unpaidCount, undeliveredCount, outOfStockCount,
  } = AdminDashboardHook();

  return (
    <div>
      <div className="adm-kpis">
        <Kpi loading={loading} icon="products" label="إجمالي المنتجات" value={productsCount} />
        <Kpi loading={loading} icon="orders" label="إجمالي الطلبات" value={ordersCount} />
        <Kpi loading={loading} icon="users" label="إجمالي المستخدمين" value={usersCount} />
        <Kpi loading={loading} icon="coupons" label="إجمالي الكوبونات" value={couponsCount} />
      </div>

      <div className="adm-dashgrid">
        <div>
          <div className="adm-panel">
            <div className="adm-panel-head">
              <div className="adm-t">أحدث الطلبات</div>
              <Link to="/admin/allorders" className="adm-link">عرض الكل</Link>
            </div>
            {loading ? (
              <AdminEmptyState loading />
            ) : recentOrders.length === 0 ? (
              <AdminEmptyState emptyText="لا توجد طلبات حتى الآن" />
            ) : (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr><th>الطلب</th><th>العميل</th><th>الإجمالي</th><th>الحالة</th><th>التاريخ</th></tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const st = orderStatus(order);
                      return (
                        <tr key={order._id}>
                          <td>
                            <Link to={`/admin/orders/${order._id}`} className="adm-strong" style={{ textDecoration: "none" }}>
                              #{order._id?.slice(-5)}
                            </Link>
                          </td>
                          <td>{order.user?.name || "عميل"}</td>
                          <td className="adm-num">{order.totalOrderPrice || 0} ج.م</td>
                          <td><span className={`adm-status ${st.cls}`}><span className={`adm-dot adm-dot-${st.cls}`} />{st.text}</span></td>
                          <td>{formatDate(order.createdAt)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="adm-panel">
            <div className="adm-panel-head">
              <div className="adm-t">أحدث المنتجات</div>
              <Link to="/admin/allproducts" className="adm-link">إدارة المنتجات</Link>
            </div>
            {loading ? (
              <AdminEmptyState loading />
            ) : recentProducts.length === 0 ? (
              <AdminEmptyState emptyText="لا توجد منتجات حتى الآن" />
            ) : (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr><th>المنتج</th><th>السعر</th><th>المخزون</th><th>الحالة</th></tr>
                  </thead>
                  <tbody>
                    {recentProducts.map((p) => {
                      const inStock = (p.quantity || 0) > 0;
                      return (
                        <tr key={p._id}>
                          <td>
                            <div className="adm-prod-cell">
                              <img className="adm-thumb" src={p.imageCover} alt="" onError={(e) => (e.target.style.visibility = "hidden")} />
                              <span className="adm-strong">{p.title}</span>
                            </div>
                          </td>
                          <td className="adm-num">{p.price} ج.م</td>
                          <td className={`adm-num ${inStock ? "" : "adm-zero"}`}>{p.quantity}</td>
                          <td><span className={`adm-status ${inStock ? "ok" : "bad"}`}><span className={`adm-dot ${inStock ? "adm-dot-ok" : "adm-dot-bad"}`} />{inStock ? "متوفر" : "غير متوفر"}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="adm-panel">
            <div className="adm-panel-head"><div className="adm-t">مؤشرات تشغيلية</div></div>
            <div className="adm-oplist">
              <div className="adm-opitem"><span>طلبات لم يتم دفعها</span><b>{loading ? "—" : unpaidCount}</b></div>
              <div className="adm-opitem"><span>طلبات لم يتم توصيلها</span><b>{loading ? "—" : undeliveredCount}</b></div>
              <div className="adm-opitem"><span>منتجات غير متوفرة</span><b>{loading ? "—" : outOfStockCount}</b></div>
            </div>
          </div>

          <div className="adm-panel">
            <div className="adm-panel-head"><div className="adm-t">إجراءات سريعة</div></div>
            <div className="adm-quick">
              <Link to="/admin/addproduct" className="adm-btn-outline">+ منتج جديد</Link>
              <Link to="/admin/addcoupon" className="adm-btn-outline">+ كوبون</Link>
              <Link to="/admin/addcategory" className="adm-btn-outline">+ قسم جديد</Link>
              <Link to="/admin/allorders" className="adm-btn-outline">كل الطلبات</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
