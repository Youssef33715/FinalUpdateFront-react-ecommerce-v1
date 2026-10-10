import { Modal, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import StarsDisplay from "./StarsDisplay";
import DeleteRateHook from "../../hook/review/delete-rate-hook";
import EditRateHook from "../../hook/review/edit-rate-hook";

const RateItem = ({ review }) => {
  const [isUser, handelDelete, handleShow, handleClose, showDelete] =
    DeleteRateHook(review);

  const [
    showEdit,
    handelCloseEdit,
    handleShowEdit,
    handelEdit,
    onChangeRateText,
    newRateText,
    OnChangeRateValue,
    newRateValue,
  ] = EditRateHook(review);

  const setting = {
    size: 20,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    value: newRateValue || 0,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      OnChangeRateValue(newValue);
    },
  };

  return (
    <div className="sf-review">
      {/* Modal الحذف */}
      <Modal show={showDelete} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تأكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="font">هل أنت تأكد من عملية حذف التقييم؟</div>
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

      {/* Modal التعديل */}
      <Modal show={showEdit} onHide={handelCloseEdit}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تعديل التقييم</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactStars key={newRateValue} {...setting} />
          <input
            onChange={onChangeRateText}
            value={newRateText}
            type="text"
            className="font w-100 mt-2"
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "5px",
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handelCloseEdit}>
            تراجع
          </Button>
          <Button variant="dark" onClick={handelEdit}>
            تعديل
          </Button>
        </Modal.Footer>
      </Modal>

      {/* عرض التقييم */}
      <div className="sf-review-head">
        <div className="sf-review-user">
          <span className="sf-review-name">{review?.user?.name}</span>
          <StarsDisplay value={review?.rating} size={13} />
          <span className="sf-muted">{review?.rating}</span>
        </div>
        {isUser && (
          <div className="sf-review-actions">
            <button type="button" onClick={handleShowEdit}>تعديل</button>
            <button type="button" className="danger" onClick={handleShow}>حذف</button>
          </div>
        )}
      </div>
      <div className="sf-review-text">{review?.title}</div>
    </div>
  );
};

export default RateItem;
