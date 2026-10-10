import GetOrderDetalisHook from '../../hook/admin/get-order-detalis-hook';
import { useParams, Link } from "react-router-dom";
import ChangeOrderStatusHook from "../../hook/admin/change-order-status-hook";
import { ToastContainer } from "react-toastify";
import { orderStatus, paymentLabel } from "./adminFormat";

// Same hooks, handlers and logic as before — only the layout changed.
const AdminOrderDetails = () => {
  const { id } = useParams();
  const [orderData] = GetOrderDetalisHook(id);
  const [formatDate, onChangePaid, OnChangePayOrder, onChangeDeliver, onChangeDeliverOrder] =
    ChangeOrderStatusHook(id);
  const st = orderStatus(orderData);
  const user = orderData?.user;
  const items = Array.isArray(orderData?.cartItems) ? orderData.cartItems : [];

  return (
    <div className="adm-detailgrid">
      <div>
        <div className="adm-panel">
          <div className="adm-panel-head">
            <div>
              <div className="adm-t">منتجات الطلب</div>
              <div className="adm-sub">تم الطلب بتاريخ {formatDate(orderData?.createdAt)}</div>
            </div>
            <Link to="/admin/allorders" className="adm-link">← العودة إلى الطلبات</Link>
          </div>
          {items.length === 0 ? (
            <div className="adm-empty">لا توجد منتجات في هذا الطلب</div>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>المنتج</th><th>السعر</th><th>الكمية</th><th>اللون</th><th>الإجمالي</th></tr></thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div className="adm-prod-cell">
                          <img className="adm-thumb" src={item.product?.imageCover} alt="" onError={(e) => (e.target.style.visibility = "hidden")} />
                          <Link to={`/products/${item.product?._id}`} className="adm-strong" style={{ textDecoration: "none" }}>
                            {item.product?.title || "—"}
                          </Link>
                        </div>
                      </td>
                      <td className="adm-num">{item.price} ج.م</td>
                      <td className="adm-num">{item.quantity}</td>
                      <td>{item.color ? <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: 4, border: "1px solid #ddd", background: item.color }} /> : "—"}</td>
                      <td className="adm-num">{(item.price || 0) * (item.quantity || 0)} ج.م</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="adm-panel">
          <div className="adm-panel-head"><div className="adm-t">ملخص الطلب</div></div>
          <div className="adm-kv"><span>الحالة</span><span><span className={`adm-status ${st.cls}`}><span className={`adm-dot adm-dot-${st.cls}`} />{st.text}</span></span></div>
          <div className="adm-kv"><span>طريقة الدفع</span><span>{paymentLabel(orderData)}</span></div>
          <div className="adm-kv"><span>الإجمالي</span><span className="adm-num">{orderData?.totalOrderPrice || 0} ج.م</span></div>
        </div>

        <div className="adm-panel">
          <div className="adm-panel-head"><div className="adm-t">بيانات العميل</div></div>
          <div className="adm-kv"><span>الاسم</span><span>{user?.name || "—"}</span></div>
          <div className="adm-kv"><span>الهاتف</span><span>{user?.phone || "—"}</span></div>
          <div className="adm-kv"><span>البريد الإلكتروني</span><span>{user?.email || "—"}</span></div>
        </div>

        <div className="adm-panel">
          <div className="adm-panel-head"><div className="adm-t">تحديث حالة الطلب</div></div>
          <label className="adm-lbl">حالة الدفع</label>
          <div className="d-flex gap-2 mb-3">
            <select name="pay" id="paid" onChange={onChangePaid} className="adm-fselect" style={{ flex: 1 }}>
              <option value="0">اختر الحالة</option>
              <option value="true">تم الدفع</option>
              <option value="false">لم يتم الدفع</option>
            </select>
            <button onClick={OnChangePayOrder} className="adm-btn adm-btn-sm">حفظ</button>
          </div>
          <label className="adm-lbl">حالة التوصيل</label>
          <div className="d-flex gap-2">
            <select onChange={onChangeDeliver} name="deliver" id="deliver" className="adm-fselect" style={{ flex: 1 }}>
              <option value="0">اختر الحالة</option>
              <option value="true">تم التوصيل</option>
              <option value="false">لم يتم التوصيل</option>
            </select>
            <button onClick={onChangeDeliverOrder} className="adm-btn adm-btn-sm">حفظ</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminOrderDetails;
