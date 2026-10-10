import { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import EditCouponHook from "../../hook/coupon/edit-coupon-hook";
import { useParams } from "react-router-dom";

const AdminEditCoupon = () => {
    const {id}=useParams()
        const dateRef = useRef();
        const [
          couponname,
          coupondate,
          couponvalue,
          onChangeName,
          onChangeDate,
          onChangeValue,
          onSubmit,
        ] = EditCouponHook(id);

  return (
    <div className="adm-form-panel">
      <div className="adm-panel-head"><div className="adm-t">بيانات الكوبون</div></div>
      <Row className="justify-content-start ">
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
            type="date"
            onFocus={() => (dateRef.current.type = "date")}
            className="input-form d-block mt-3 px-3"
            placeholder="تاريخ الانتهاء"
            onChange={onChangeDate}
            value={coupondate}
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
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={onSubmit} className="adm-btn mt-2">
            حفظ التعديلات
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
}

export default AdminEditCoupon
