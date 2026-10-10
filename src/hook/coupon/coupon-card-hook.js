import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteCoupon } from "../../redux/actions/couponAction";

const CouponCardHook = (coupon) => {
  const dispatch =useDispatch()  
  const dataString = coupon.expire;
  const formatData = (dataString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dataString).toLocaleDateString(undefined, options);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 // const dispatch = useDispatch();
  const handelDelete = async () => {
    await dispatch(deleteCoupon(coupon._id));
    setShow(false);
    window.location.reload(false);
  };
  return [formatData,dataString,show,handleClose,handleShow,handelDelete]
};

export default CouponCardHook;
