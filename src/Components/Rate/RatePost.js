import ReactStars from "react-rating-stars-component";
import AddRateHook from "../../hook/review/add-rate-hook";
import { useParams } from "react-router-dom";

const RatePost = () => {
  const { id } = useParams();
  const [OnChangeRateText, OnChangeRateValue, rateText, rateValue, user, onSubmit] = AddRateHook(id);

  const name = user ? user.name : "";

  const setting = {
    size: 24,
    count: 5,
    color: "#c9c9c4",
    activeColor: "#d4a017",
    value: rateValue,
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
    <div className="sf-rate-post">
      <div className="sf-rate-post-head">
        <b>أضف تقييمك</b>
        {name ? <span className="sf-muted">{name}</span> : null}
      </div>
      <ReactStars {...setting} />
      <textarea
        value={rateText}
        onChange={OnChangeRateText}
        rows="3"
        placeholder="اكتب تعليقك...."
        aria-label="التعليق"
      />
      <div className="sf-rate-post-actions">
        <button type="button" className="sf-btn sf-btn-inline" onClick={onSubmit}>
          إضافة تعليق
        </button>
      </div>
    </div>
  );
};

export default RatePost;
