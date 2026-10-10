import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import {
  editUserAddress,
  getOneUserAddress,
} from "../../redux/actions/userAddressAction";
import { useNavigate } from "react-router-dom";
import notify from "../../hook/useNotifaction";

const isSuccessBody = (r) =>
  !!r && typeof r.status === "string" && r.status.toLowerCase() === "success";

// Field names follow the backend address schema exactly:
// alias, detalis (sic), phone, city, postalCode
const EditAddressHook = (id) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useStore();

  const [form, setForm] = useState({
    alias: "",
    detalis: "",
    phone: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onChangeField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  // Prefill from GET /api/v1/addresses/:id (existing getOneUserAddress action)
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getOneUserAddress(id));
      const res = store.getState().userAddressReducer.oneAddress;
      // ignore a stale result left in the store by another address/page
      if (isSuccessBody(res) && res.data && String(res.data._id) === String(id)) {
        setForm({
          alias: res.data.alias || "",
          detalis: res.data.detalis || "",
          phone: res.data.phone || "",
          city: res.data.city || "",
          postalCode: res.data.postalCode || "",
        });
        setLoadFailed(false);
      } else {
        setLoadFailed(true);
      }
      setLoading(false);
    };
    get();
  }, [dispatch, id]);

  const onSubmit = async () => {
    if (submitting) return;
    if (!form.alias.trim() || !form.detalis.trim() || !form.phone.trim()) {
      notify("من فضلك اكمل البيانات المطلوبة", "warn");
      return;
    }
    setSubmitting(true);
    await dispatch(
      editUserAddress(id, {
        alias: form.alias.trim(),
        detalis: form.detalis.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(),
      }),
    );
    const res = store.getState().userAddressReducer.updateAddress;
    if (isSuccessBody(res)) {
      notify("تمت عملية التعديل بنجاح", "success");
      setTimeout(() => navigate("/user/addresses"), 800);
    } else {
      setSubmitting(false);
      notify("هناك خطأ في عملية التعديل", "error");
    }
  };

  return [form, onChangeField, onSubmit, submitting, loading, loadFailed];
};

export default EditAddressHook;
