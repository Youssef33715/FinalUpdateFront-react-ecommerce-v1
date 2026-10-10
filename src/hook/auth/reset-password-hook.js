import { useEffect, useState } from "react";
import notify from "./../useNotifaction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/actions/authAction";

const ResetPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(true);

  const OnChangePassword = (e) => setPassword(e.target.value);
  const OnChangeConfirmPassword = (e) => setConfirmpassword(e.target.value);

  const onSubmit = async () => {
    if (password === "") {
      notify("من فضلك ادخل كلمة السر الجديدة", "error");
      return;
    }
    if (password !== confirmpassword) {
      notify("كلمة السر غير متطابقة", "error");
      return;
    }

    // 2. التاكد من وجود الإيميل في الـ localStorage
    const savedEmail = localStorage.getItem("user-email");
    if (!savedEmail) {
      notify("جلسة العمل انتهت، من فضلك اطلب كود جديد", "error");
      return;
    }

    setLoading(true);
    await dispatch(
      resetPassword({
        email: savedEmail,
        newPassword: password,
      }),
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.authReducer.resetPassword);

  useEffect(() => {
    if (loading === false) {
      if (res) {

        if (
          res.status === 200 ||
          res.data?.status === "success" ||
          res.data?.status === "Success"
        ) {
          notify("تم تغيير كلمة السر بنجاح", "success");
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          notify("حدث خطأ، من فضلك اطلب كود جديد", "error");
        }
      }
    }
  }, [loading]);

  return [
    password,
    confirmpassword,
    OnChangePassword,
    OnChangeConfirmPassword,
    onSubmit,
  ];
};

export default ResetPasswordHook;
