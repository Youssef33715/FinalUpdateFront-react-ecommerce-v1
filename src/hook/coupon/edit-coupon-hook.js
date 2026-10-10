import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCoupon, getOneCoupon } from "../../redux/actions/couponAction";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";
import { useNavigate } from "react-router-dom";

const EditCouponHook = (id) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [couponname, setCouponName] = useState("");
  const [coupondate, setCouponDate] = useState("");
  const [couponvalue, setCouponValue] = useState("");

  // 1. اجعل القيمة الابتدائية لـ loading غير مفعلة (true فقط عند الضغط على حفظ)
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const oneCoupon = useSelector((state) => state.couponReducer.oneCoupon);

  useEffect(() => {
    const get = async () => {
      await dispatch(getOneCoupon(id));
    };
    get();
  }, [id, dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (oneCoupon && oneCoupon.data) {
      setCouponName(oneCoupon.data.name || "");
      setCouponDate(formatDate(oneCoupon.data.expire));
      setCouponValue(oneCoupon.data.discount || "");
    }
  }, [oneCoupon]);

  const onChangeName = (e) => setCouponName(e.target.value);
  const onChangeDate = (e) => setCouponDate(e.target.value);
  const onChangeValue = (e) => setCouponValue(e.target.value);

  const onSubmit = async () => {
    if (couponname === "" || coupondate === "" || couponvalue <= 0) {
      notify("من فضلك أكمل البيانات المطلوبة", "warn");
      return;
    }

    setLoading(true);
    setIsSubmitting(true); // علامة تؤكد أن المستخدِم ضغط على الحفظ

    await dispatch(
      editCoupon(id, {
        name: couponname,
        expire: coupondate,
        discount: couponvalue,
      }),
    );

    setLoading(false);
  };

  const res = useSelector((state) => state.couponReducer.updateCoupon);

  // 2. الفحص يتم فقط بعد ضغط Submit وانتهائه
  useEffect(() => {
    if (loading === false && isSubmitting === true) {
      if (res && (res.status === 200 || res.status === 201|| res.data?._id)) {
        notify("تم التعديل بنجاح", "success");
        setTimeout(() => {
          navigate("/admin/addcoupon");
        }, 1000);
      } else {
        notify("فشل التعديل", "error");
      }
      setIsSubmitting(false); // إعادة التعيين
    }
  }, [loading, isSubmitting, res, navigate]);

  return [
    couponname,
    coupondate,
    couponvalue,
    onChangeName,
    onChangeDate,
    onChangeValue,
    onSubmit,
  ];
};

export default EditCouponHook;
