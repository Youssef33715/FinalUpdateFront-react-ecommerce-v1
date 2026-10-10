import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUserCartItems } from "../../redux/actions/cartAction";

const GetAllUserCart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // becomes true in the same batch that copies the response into state,
  // so pages never flash an empty cart between fetch and render
  const [ready, setReady] = useState(false);
  const [itemsNum, setItemsNum] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState('');
  const [cartID, setCartID] = useState('0');

  const [totalCartPriceAfterDiscount, setTotalCartPriceAfterDiscount] = useState(0);

  const [couponName, setCouponName] = useState('');

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getAllUserCartItems());
      setLoading(false);
    };
    get();
  }, [dispatch]);

  const res = useSelector((state) => state.cartReducer.getAllUserCart);

  useEffect(() => {
    if (loading === false) {
      if (res &&(res.status === "Success" || res.status === "success") &&res.data) {
        setItemsNum(res.numofCartItems || res.numOfCartItems || 0);
        setCartItems(res.data.cartItems || []);
        setTotalCartPrice(res.data.totalCartPrice)
        setCartID(res.data._id)
        if(res.data.coupon){
          setCouponName(res.data.coupon)
        }else{
          setCouponName('')
        }
        if (res.data.totalPriceAfterDiscount) {
          setTotalCartPriceAfterDiscount(res.data.totalPriceAfterDiscount);
        } else {
          setTotalCartPriceAfterDiscount("");
        }
      } else {
        setCartID('0')
        setCouponName('')
        setTotalCartPriceAfterDiscount('')
        setItemsNum(0);
        setCartItems([]);
        setTotalCartPrice(0);
      }
      setReady(true);
    }
  }, [loading, res]);

  // `loading` was added at the end so existing positional callers keep working
  return [itemsNum, cartItems,totalCartPrice,couponName,totalCartPriceAfterDiscount,cartID,!ready];
};

export default GetAllUserCart;
