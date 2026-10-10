import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSearch } from "../../redux/actions/productsAction";
import { buildShopQuery } from "./shop-filters";

// Same return shape as before: [items, pagination, onPress, getProduct, results]
// (the navbar search also uses this hook). Filters, sort and page now come from
// the shared in-memory filter store, so every caller sends the same query.
const ViewSearchProductsHook = () => {
  const dispatch = useDispatch();

  const getProduct = async () => {
    await dispatch(getAllProductsSearch(buildShopQuery()));
  };
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // to drive the products
  const allProducts = useSelector((state) => state.allproducts.allProducts);
  let items = [];
  let pagination = [];
  let results = 0;
  if (allProducts && allProducts.data) items = allProducts.data;
  if (allProducts && allProducts.paginationResult)
    pagination = allProducts.paginationResult.numberOfPages;
  if (allProducts && allProducts.results) results = allProducts.results;

  // when click pagination
  const onPress = async (page) => {
    await dispatch(getAllProductsSearch(buildShopQuery({ page })));
  };

  return [items, pagination, onPress, getProduct, results];
};

export default ViewSearchProductsHook;
