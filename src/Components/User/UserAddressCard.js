import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteAddressHook from "../../hook/user/delete-address-hook";

const UserAddressCard = ({ item }) => {
  const [show, handleClose, handleShow, handelDelete] = DeleteAddressHook(item._id);
  const place = [item.city, item.postalCode].filter(Boolean).join(" — ");

  return (
    <div className="acct-card acct-addr">
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>
            <div className="font"> تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل انت متاكد من عمليه الحذف العنوان</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button variant="dark" onClick={handelDelete}>
            احذف
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="acct-addr-head">
        <div className="acct-ic">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="acct-addr-alias">{item.alias}</div>
      </div>

      <div className="acct-addr-body">
        {item.detalis ? (
          <div className="acct-addr-text">{item.detalis}</div>
        ) : (
          <div className="acct-addr-text acct-muted">لا توجد تفاصيل محفوظة لهذا العنوان</div>
        )}
        {place ? <div className="acct-addr-line">{place}</div> : null}
        {item.phone ? (
          <div className="acct-addr-line">
            <span>رقم الهاتف:</span> <b>{item.phone}</b>
          </div>
        ) : null}
      </div>

      <div className="acct-addr-actions">
        <Link to={`/user/edit-address/${item._id}`} className="acct-btn-outline">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          تعديل
        </Link>
        <button type="button" className="acct-btn-outline danger" onClick={handleShow}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 14h10l1-14" />
          </svg>
          حذف
        </button>
      </div>
    </div>
  );
};

export default UserAddressCard;
