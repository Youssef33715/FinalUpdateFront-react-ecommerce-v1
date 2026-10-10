import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductWishList } from "../../redux/actions/wishListAction";

const CardContainerHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [favProd, setFavProd] = useState([]);

  const res = useSelector((state) => state.addToWishListReducer.allWishList);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getProductWishList());
      setLoading(false);
    };
    get();
  }, [dispatch]);

  useEffect(() => {
    if (loading === false) {
      if (res && res.data && Array.isArray(res.data) && res.data.length >= 1) {
        setFavProd(res.data.map((item) => item._id));
      } else if (
        res &&
        res.data &&
        res.data.data &&
        Array.isArray(res.data.data)
      ) {
        // في حال كان الـ API يرجع data داخل data
        setFavProd(res.data.data.map((item) => item._id));
      } else {
        setFavProd([]);
      }
    }
  }, [loading, res]);

  return [favProd];
};

export default CardContainerHook;
