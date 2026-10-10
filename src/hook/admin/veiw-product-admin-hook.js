import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";
import { getAllProductsPage } from "../../redux/actions/productsAction";

const ViewProductAdminHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts(12));
  }, []);

    const onPress = async (page) => {
      await dispatch(getAllProductsPage(page, 12));
    };

  // to drive the products
  let items = [];
  let pagination = [];

  const allProducts = useSelector((state) => state.allproducts.allProducts);
  try{
  if (allProducts && allProducts.data) {
    items = allProducts.data;
  }

  if (allProducts && allProducts.paginationResult) {
    pagination = allProducts.paginationResult.numberOfPages;
  }
  }
  catch(e){}

  return [items,pagination,onPress];
};

export default ViewProductAdminHook;
