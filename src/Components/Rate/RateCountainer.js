import Pagination from "../Uitily/Pagination";
import RateItem from "./RateItem";
import RatePost from "./RatePost";
import StarsDisplay from "./StarsDisplay";
import ViewAllReviewHook from "../../hook/review/view-all-review-hook";
import { useParams } from "react-router-dom";

const RateCountainer = ({ rateAvg, rateQty }) => {
  const { id } = useParams();
  const [allReview, onPress] = ViewAllReviewHook(id);
  const qty = Number(rateQty) || 0;
  const reviews = Array.isArray(allReview?.data) ? allReview.data : [];

  return (
    <section className="sf-section sf-reviews" id="reviews">
      <div className="sf-reviews-head">
        <h2 className="sf-section-title">التقييمات</h2>
        {qty > 0 ? (
          <div className="sf-reviews-sum">
            <StarsDisplay value={rateAvg} />
            <b>{rateAvg}</b>
            <span className="sf-muted">({qty} تقييم)</span>
          </div>
        ) : null}
      </div>

      <RatePost />

      <div className="sf-review-list">
        {reviews.length > 0 ? (
          reviews.map((review, index) => <RateItem key={review?._id || index} review={review} />)
        ) : (
          <div className="sf-muted sf-review-empty">
            {qty > 0 && !allReview?.data ? "جاري تحميل التقييمات..." : "لا توجد تقييمات بعد"}
          </div>
        )}
      </div>

      {allReview?.paginationResult && allReview.paginationResult.numberOfPages >= 2 ? (
        <Pagination pageCount={allReview.paginationResult.numberOfPages} onPress={onPress} />
      ) : null}
    </section>
  );
};

export default RateCountainer;
