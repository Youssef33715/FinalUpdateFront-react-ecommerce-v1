import { useEffect, useState } from "react";
import notify from "./../useNotifaction";
import { useDispatch, useSelector } from "react-redux";
import { updateReviewOnProduct } from "../../redux/actions/reviewAction";

const EditRateHook = (review) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [newRateText, setNewRateText] = useState(review.title);
  const [newRateValue, setNewRateValue] = useState(review.ratings);

  const [showEdit, setShowEdit] = useState(false);

  const handelCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const onChangeRateText = (e) => {
    setNewRateText(e.target.value);
  };
  const OnChangeRateValue = (val) => {
    setNewRateValue(val);
  };

  const handelEdit = async () => {
    setLoading(true);
    await dispatch(
      updateReviewOnProduct(review._id, {
        title: newRateText,
        ratings: newRateValue,
      }),
    );
    setLoading(false);
    handelCloseEdit();
  };

  const res = useSelector((state) => state.reviewReducer.updateReview);

  useEffect(() => {
    if (loading === false) {
      // فحص نجاح العملية بجميع الأشكال المرجعة من Axios والباك إيند
      if (res && (res.status === 200 || res.status === "success" || res.data)) {
        notify("تم تعديل التقييم بنجاح", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify("هناك مشكله في عمليه التعديل", "error");
      }
    }
  }, [loading]);

  return [
    showEdit,
    handelCloseEdit,
    handleShowEdit,
    handelEdit,
    onChangeRateText,
    newRateText,
    OnChangeRateValue,
    newRateValue,
  ];
};

export default EditRateHook;
