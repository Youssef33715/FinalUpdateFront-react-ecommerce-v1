import { useEffect, useState } from "react";
import notify from "./../useNotifaction";
import { useDispatch, useSelector } from "react-redux";
import {  deleteReviewonProduct } from "../../redux/actions/reviewAction";

const DeleteRateHook = (review) => {
    const dispatch = useDispatch();

    const [isUser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(true);

    const [showDelete, setShowDelete] = useState(false);

    const handleClose = () => setShowDelete(false);
    const handleShow = () => setShowDelete(true);

    let user = JSON.parse(localStorage.getItem("user"));

    useEffect(()=>{
      if (review?.user._id === user?._id) {
        setIsUser(true);
      }

    },[])

    const handelDelete =async () => {
        setLoading(true)
        await dispatch(deleteReviewonProduct(review._id))
        setLoading(false)
        handleClose()
    };
    const res = useSelector((state) => state.reviewReducer.deleteReview);

    useEffect(()=>{
        if(loading === false){
            if (
              res === "" ||
              res === true ||
              res?.status === 204 ||
              res?.status === 200
            ) {
              notify("تم الحذف بنجاح", "success");
              setTimeout(() => {
                window.location.reload(false);
              }, 1000);
            } else {
              notify("هناك مشكله في عمليه الحذف", "error");
            }
        }
    },[loading])


    return[isUser,handelDelete,handleShow,handleClose,showDelete]
}

export default DeleteRateHook
