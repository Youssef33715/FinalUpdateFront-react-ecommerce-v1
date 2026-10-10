import { useEffect, useState } from "react"
import { useDispatch,useSelector } from "react-redux";
import { getAllOrders } from "../../redux/actions/orderAction";

const UserGetAllOrderHook = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResult] = useState(0);
  const [paginate, setPaginate] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [failed, setFailed] = useState(false);

  const dispatch = useDispatch();

  let userName = "";
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) userName = user.name;
  } catch (e) {
    userName = "";
  }

  const get = async () => {
    setLoading(true);
    await dispatch(getAllOrders('',5));
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  const onPress=async(page)=>{
     setLoading(true);
    await dispatch(getAllOrders(page,5));
    setLoading(false);   
  }
  const resAllOrders = useSelector((state) => state.orderReducer.getAllOrders);

  useEffect(() => {
    if (loading === false) {
      // A failed request is stored as an axios error response, whose `.data`
      // is an error object, not the orders array.
      if (resAllOrders && Array.isArray(resAllOrders.data)) {
        setFailed(false);
        setResult(resAllOrders.results || 0);
        setPaginate(resAllOrders.paginationResult || []);
        setOrderData(resAllOrders.data);
      } else {
        setFailed(true);
        setOrderData([]);
      }
    }
  }, [loading]);

  return [userName,results,paginate,orderData,onPress,loading,failed];
};

export default UserGetAllOrderHook
