import AdminAllOrdersItem from "./AdminAllOrdersItem";
import AdminOrdersManageHook from "../../hook/admin/admin-orders-manage-hook";
import Pagination from "./../Uitily/Pagination";
import AdminEmptyState from "./AdminEmptyState";

// Dedicated admin hook (the customer's own orders page keeps using its own).
// Filters use the real ispaid / isDelivered fields of the Order model.
const AdminAllOrders = () => {
  const {
    orders, totalResults, pageCount, loading, onPageChange,
    paidFilter, setPaidFilter, deliveredFilter, setDeliveredFilter,
  } = AdminOrdersManageHook();

  return (
    <div className="adm-panel">
      <div className="adm-filters-row">
        <select className="adm-fselect" value={paidFilter} onChange={(e) => setPaidFilter(e.target.value)}>
          <option value="">كل حالات الدفع</option>
          <option value="true">تم الدفع</option>
          <option value="false">لم يتم الدفع</option>
        </select>
        <select className="adm-fselect" value={deliveredFilter} onChange={(e) => setDeliveredFilter(e.target.value)}>
          <option value="">كل حالات التوصيل</option>
          <option value="true">تم التوصيل</option>
          <option value="false">لم يتم التوصيل</option>
        </select>
      </div>

      {loading ? (
        <AdminEmptyState loading />
      ) : orders.length === 0 ? (
        <AdminEmptyState emptyText="لا توجد طلبات مطابقة" />
      ) : (
        <>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>رقم الطلب</th><th>العميل</th><th>التاريخ</th><th>الإجمالي</th>
                  <th>طريقة الدفع</th><th>حالة الدفع</th><th>حالة التوصيل</th><th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((orderItem, index) => (
                  <AdminAllOrdersItem key={orderItem._id || index} orderItem={orderItem} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="adm-table-foot">
            <div className="adm-count-note">المعروض في هذه الصفحة: {totalResults}</div>
            {pageCount > 1 && <Pagination onPress={onPageChange} pageCount={pageCount} />}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAllOrders;
