import { useState } from "react";

import { useDispatch, useStore } from "react-redux";
import {
  deleteUserAddress,
  getAllUserAddress,
} from "../../redux/actions/userAddressAction";
import notify from "../useNotifaction";

const DeleteAddressHook = (id) => {
  const dispatch = useDispatch();
  const store = useStore();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelDelete = async () => {
    await dispatch(deleteUserAddress(id));
    const res = store.getState().userAddressReducer.deleteUserAddress;
    setShow(false);
    if (res && typeof res.status === "string" && res.status.toLowerCase() === "success") {
      notify("تم حذف العنوان", "success");
    } else {
      notify("تعذّر حذف العنوان", "error");
    }
    // refetch the list (no page reload)
    await dispatch(getAllUserAddress());
  };
  return[show,handleClose,handleShow,handelDelete]
};

export default DeleteAddressHook;
