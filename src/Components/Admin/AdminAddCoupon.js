import { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AddCouponHook from "../../hook/coupon/add-coupon-hook";
import AdminCouponCard from "./AdminCouponCard";
import AdminEmptyState from "./AdminEmptyState";

// Logic 100% untouched (same AddCouponHook). Only the visual layer changed:
// stacked cards became a table.
const AdminAddCoupon = () => {
  const dateRef = useRef();
  const [
    couponname,
    coupondate,
    couponvalue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    onSubmit,
    ,
    coupons,
  ] = AddCouponHook();

  return (
    <div>
      <div className="adm-form-panel mb-4">
        <div className="adm-panel-head"><div className="adm-t">إضافة كوبون جديد</div></div>
        <Row className="justify-content-start">
          <Col sm="8">
            <input
              value={couponname}
              onChange={onChangeName}
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="اسم الكوبون"
            />
            <input
              ref={dateRef}
              type="text"
              className="input-form d-block mt-3 px-3"
              placeholder="تاريخ الانتهاء"
              onChange={onChangeDate}
              value={coupondate}
              onFocus={() => (dateRef.current.type = "date")}
              onBlur={() => (dateRef.current.type = "text")}
            />
            <input
              value={couponvalue}
              onChange={onChangeValue}
              type="number"
              className="input-form d-block mt-3 px-3"
              placeholder="نسبة الخصم %"
            />
          </Col>
        </Row>
        <Row>
          <Col sm="8" className="d-flex justify-content-end">
            <button onClick={onSubmit} className="adm-btn mt-3">حفظ الكوبون</button>
          </Col>
        </Row>
      </div>

      <div className="adm-panel">
        <div className="adm-panel-head"><div className="adm-t">كل الكوبونات</div></div>
        {!coupons || coupons.length === 0 ? (
          <AdminEmptyState emptyText="لا توجد كوبونات حتى الآن" />
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>الكوبون</th><th>نسبة الخصم</th><th>تاريخ الانتهاء</th><th>الإجراءات</th></tr></thead>
              <tbody>
                {coupons.map((item, index) => (
                  <AdminCouponCard key={index} coupon={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminAddCoupon;
