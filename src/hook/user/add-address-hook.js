import { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";
import { addUserAddress } from "../../redux/actions/userAddressAction";
import { useNavigate } from "react-router-dom";

// Field names follow the backend address schema exactly:
// alias, detalis (sic), phone, city, postalCode
const AddAddressHook = () => {
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
  const [submitting, setSubmitting] = useState(false);

  const onChangeField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const onSubmit = async () => {
    if (submitting) return;
    if (!form.alias.trim() || !form.detalis.trim() || !form.phone.trim()) {
      notify("من فضلك اكمل البيانات المطلوبة", "warn");
      return;
    }
    setSubmitting(true);
    await dispatch(
      addUserAddress({
        alias: form.alias.trim(),
        detalis: form.detalis.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(),
      }),
    );
    const res = store.getState().userAddressReducer.addUserAddress;
    if (res && res.status === 200) {
      notify("تمت اضافه العنوان  بنجاح", "success");
      setTimeout(() => navigate("/user/addresses"), 800);
    } else {
      setSubmitting(false);
      notify(" هناك مشكله في عمليه الاضافه ", "error");
    }
  };

  return [form, onChangeField, onSubmit, submitting];
};

export default AddAddressHook;
