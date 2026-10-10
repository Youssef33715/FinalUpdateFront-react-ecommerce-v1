import {useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { addCoupon, getAllCoupon } from '../../redux/actions/couponAction';
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifaction";

const AddCouponHook = () => {
  
  const dispatch =useDispatch()  
  const [couponname, setCouponName] = useState("");
  const [coupondate, setCouponDate] = useState("");
  const [couponvalue, setCouponValue] = useState('');
  const [loading, setLoading] = useState(true);

  // to change name state
  const onChangeName = (e) => {
    e.persist();
    setCouponName(e.target.value);
  };
  // to change name state
  const onChangeDate = (e) => {
    e.persist();
    setCouponDate(e.target.value);
  };
  // to change value coupon state
  const onChangeValue = (e) => {
    e.persist();
    setCouponValue(e.target.value);
  };

  const onSubmit=async()=>{
    if(couponname ==="" || coupondate === ""|| couponvalue <=0){
        notify("من فضلك أكمل البيانات المطلوبة","warn")
        return
    }
    setLoading(true)
    await dispatch(
      addCoupon({
        name: couponname,
        expire: coupondate,
        discount: couponvalue,
      }));
      setLoading(false)
  }
  const res = useSelector((state) => state.couponReducer.addCoupon);

  useEffect(()=>{
    if(loading === false){
        if (res && res.status === 201) {
          notify("تمت إضافة الكوبون بنجاح", "success");
          window.location.reload(false)
          
        } else if (res && res.status === 400) {
          notify("هذا الكوبون موجود بالفعل", "error");
        } else if (res && res.status === 403) {
          notify("غير مسموح لك بإضافة كوبونات", "error");
        }
}
  },[loading])


  useEffect(()=>{
    const get=async()=>{
      await dispatch(getAllCoupon())
    }
    get()
  },[])
  const allCoupon = useSelector((state) => state.couponReducer.allCoupon);
  let coupons=[]
  try{
  if (allCoupon && allCoupon.data.length >= 1)
      coupons = allCoupon.data;
  }catch(e){
  }
  return [couponname,coupondate,couponvalue,onChangeName,onChangeDate,onChangeValue,onSubmit,
    allCoupon,coupons]
};;;

export default AddCouponHook
