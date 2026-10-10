import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import {  getOneOrder } from "../../redux/actions/orderAction";

const GetOrderDetalisHook = (id) => {
   const [loading, setLoading] = useState(true);
   const [orderData, setOrderData] = useState([]);
   const [cartItems, setCartItems] = useState([]);
  
   const dispatch = useDispatch();

  const get = async () => {
    setLoading(true);
    await dispatch(getOneOrder(id));
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  const resOneOrder = useSelector((state) => state.orderReducer.getOneOrder);

  useEffect(() => {
    if (loading === false) {
      if(resOneOrder.data)
        setOrderData(resOneOrder.data)
      if(resOneOrder.data.cartItems)
        setCartItems(resOneOrder.data.cartItems);
      //console.log(resOneOrder.data)
    }
  }, [loading]);
  
  return[orderData,cartItems]
};

export default GetOrderDetalisHook;
