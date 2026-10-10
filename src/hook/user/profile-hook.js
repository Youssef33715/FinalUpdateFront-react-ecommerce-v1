import { useEffect, useState } from "react";
import { updateUserPassword, updateUserProfileData } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import notify from "../../hook/useNotifaction";
import { useNavigate } from "react-router-dom";

const ProfileHook = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  let user = {};
  if (localStorage.getItem("user") !== null) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(
    user.phone || user.phoneNumber || user.phone_number || "",
  );
  const [loading, setLoading] = useState(true);

  // تحديث القيم بالبيانات الحالية من user عند فتح المودال
  const handleShow = () => {
    setShow(true);
    if (localStorage.getItem("user") !== null) {
      const latestUser = JSON.parse(localStorage.getItem("user"));
      setName(latestUser.name || "");
      setEmail(latestUser.email || "");
      setPhone(latestUser.phone || latestUser.phoneNumber || "");
    }
  };

  const onChangeName = (e) => setName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePhone = (e) => setPhone(e.target.value);

  const handelSubmit = async () => {
    let body

    if(user.email ===email){
      body = {
        name,
        phone,
      };
    }else{
      body = {
        name,
        email,
        phone,
      };
    }
    setLoading(true);
    await dispatch(
      updateUserProfileData(body));
    setLoading(false);
    setShow(false);
  };

  const res = useSelector((state) => state.authReducer.userProfile);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify("تم التحديث بنجاح", "success");

        const currentUserData = res.data.data.user || res.data.data;

        localStorage.setItem("user", JSON.stringify(currentUserData));

        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else if (res) {
        notify("فشل عملية التحديث", "warn");
      }
    }
  }, [loading]);

  //change user password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingPass ,setLoadingPassword] =useState(true)

  const onChangeOldPass = (e) => setOldPassword(e.target.value);
  const onChangeNewPass = (e) => setNewPassword(e.target.value);
  const onChangeConfirmPass = (e) => setConfirmPassword(e.target.value);

  const changePassword=async()=>{
    if(confirmPassword !==newPassword){
      notify("كلمه السر غير مطابقه", "warn");
      return
    }
    setLoadingPassword(true)
    await dispatch(updateUserPassword({
      currentPassword:oldPassword,
      password:newPassword,
      passwordConfirm:confirmPassword
    }));
    setLoadingPassword(false)
  }
const resPass = useSelector((state) => state.authReducer.userChangePassword);

useEffect(() => {
  if (loadingPass === false) {
    // التأكد من وجود الـ token أو الـ data في الـ response
    if (resPass && (resPass.token || resPass.data)) {
      notify("تم تغير كلمه المرور بنجاح", "success");

      setTimeout(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      }, 1500);
    } else if (resPass) {
      notify("فشل عملية التحديث", "warn");
    }
  }
}, [loadingPass]);

  return [
    user,
    show,
    handleClose,
    handleShow,
    handelSubmit,
    name,
    email,
    phone,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    changePassword,
    oldPassword,
    newPassword,
    confirmPassword,
    onChangeOldPass,
    onChangeNewPass,
    onChangeConfirmPass,
  ];
};

export default ProfileHook;
