import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CouponCardHook from "../../hook/coupon/coupon-card-hook";

// Restyled as a table row. Same CouponCardHook, same delete/edit logic
// (delete now actually works — see couponAction.js bug fix).
const AdminCouponCard = ({ coupon }) => {
  const [formatData, dataString, show, handleClose, handleShow, handelDelete] = CouponCardHook(coupon);

  return (
    <tr>
      <td><span className="adm-roletag">{coupon.name}</span></td>
      <td className="adm-num">{coupon.discount}%</td>
      <td>{formatData(dataString)}</td>
      <td>
        <div className="adm-row-actions">
          <Link to={`/admin/editcoupon/${coupon._id}`} title="تعديل">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </Link>
          <span className="adm-act-del" onClick={handleShow} title="حذف" style={{ cursor: "pointer" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6h18" /><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            </svg>
          </span>
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body className="text-center p-4">
            <p className="mb-4">هل أنت متأكد من حذف الكوبون "{coupon.name}"؟</p>
            <Button variant="outline-dark" className="mx-2" onClick={handleClose}>إلغاء</Button>
            <Button variant="dark" className="mx-2" onClick={handelDelete}>حذف</Button>
          </Modal.Body>
        </Modal>
      </td>
    </tr>
  );
};

export default AdminCouponCard;
