import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderDeliver,
  changeOrderPay,
} from "../../redux/actions/orderAction";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";

const ChangeOrderStatusHook = (id) => {
  const [loadingPay, setLoadingPay] = useState(true);
  const [loadingDeliver, setLoadingDeliver] = useState(true);

  const [isSubmittedPay, setIsSubmittedPay] = useState(false);
  const [isSubmittedDeliver, setIsSubmittedDeliver] = useState(false);

  const [pay, setPay] = useState("0");
  const [deliver, setDeliver] = useState("0");
  const dispatch = useDispatch();

  // --- تغيير حالة الدفع ---
  const OnChangePayOrder = async () => {
    if (pay === "true") {
      setLoadingPay(true);
      setIsSubmittedPay(true);
      await dispatch(changeOrderPay(id));
      setLoadingPay(false);
    } else if (pay === "0") {
      notify("من فضلك اختر قيمة", "warn");
    }
  };

  // --- تغيير حالة التوصيل ---
  const onChangeDeliverOrder = async () => {
    if (deliver === "true") {
      setLoadingDeliver(true);
      setIsSubmittedDeliver(true); // هنا كانت المشكلة! لازم تفعل الـ Flag وقت الضغط
      await dispatch(changeOrderDeliver(id));
      setLoadingDeliver(false);
    } else if (deliver === "0") {
      notify("من فضلك اختر قيمة", "warn");
    }
  };

  // استرجاع الـ Reducers
  const resOneOrder = useSelector((state) => state.orderReducer.changePayOrder);
  const resDeliverOrder = useSelector(
    (state) => state.orderReducer.changeDeliverOrder,
  );

  // --- useEffect لمراقبة الدفع ---
  useEffect(() => {
    if (loadingPay === false && isSubmittedPay) {
      if (
        resOneOrder &&
        (resOneOrder.status === "Sucess" ||
          resOneOrder.status === "success" ||
          resOneOrder.status === 200)
      ) {
        notify("تم تحديث حالة الدفع بنجاح", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify("حدثت مشكلة أثناء تحديث الطلب", "error");
      }
      setIsSubmittedPay(false);
    }
  }, [loadingPay, isSubmittedPay]);

  // --- useEffect لمراقبة التوصيل ---
  useEffect(() => {
    if (loadingDeliver === false && isSubmittedDeliver) {
      if (
        resDeliverOrder &&
        (resDeliverOrder.status === "Sucess" ||
          resDeliverOrder.status === "success" ||
          resDeliverOrder.status === 200)
      ) {
        notify("تم تحديث حالة التوصيل بنجاح", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify("حدثت مشكلة أثناء تحديث الطلب", "error");
      }
      setIsSubmittedDeliver(false);
    }
  }, [loadingDeliver, isSubmittedDeliver]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  const onChangePaid = (e) => {
    setPay(e.target.value);
  };

  const onChangeDeliver = (e) => {
    setDeliver(e.target.value);
  };

  return [
    formatDate,
    onChangePaid,
    OnChangePayOrder,
    onChangeDeliver,
    onChangeDeliverOrder,
  ];
};

export default ChangeOrderStatusHook;
