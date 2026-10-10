import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSearch } from "../../redux/actions/productsAction";
// plain GET helper, imported under a neutral name (not a React hook)
import { useGetData as fetchList } from "../../hooks/useGetData";
import {
  buildShopQuery,
  readSearchWord,
  resetShopFilters,
  setShopFilters,
  useShopFilters,
} from "./shop-filters";

// State and actions of the Products page. The product list still comes from
// the existing getAllProductsSearch action / allproducts.allProducts store key
// (the navbar search writes there too).
const UseShopPageHook = () => {
  const dispatch = useDispatch();
  const filters = useShopFilters();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const reqId = useRef(0);
  const priceTimer = useRef(null);

  const allProducts = useSelector((state) => state.allproducts.allProducts);

  const load = useCallback(async () => {
    const id = ++reqId.current;
    setLoading(true);
    await dispatch(getAllProductsSearch(buildShopQuery()));
    if (id === reqId.current) setLoading(false);
  }, [dispatch]);

  // entering /products always starts from clean filters
  useEffect(() => {
    resetShopFilters();
    load();
    return () => clearTimeout(priceTimer.current);
  }, [load]);

  // category / brand lists for the filter panel (own state: the shared store
  // keys are also written by the category header with a different limit)
  useEffect(() => {
    let alive = true;
    fetchList("/api/v1/categories?limit=100")
      .then((r) => alive && setCategories(Array.isArray(r?.data) ? r.data : []))
      .catch(() => {});
    fetchList("/api/v1/brands?limit=100")
      .then((r) => alive && setBrands(Array.isArray(r?.data) ? r.data : []))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const items = allProducts && Array.isArray(allProducts.data) ? allProducts.data : [];
  const failed = !loading && !(allProducts && Array.isArray(allProducts.data));
  const pagination = allProducts?.paginationResult;
  const results = allProducts?.results || 0;

  const apply = (patch) => {
    setShopFilters({ ...patch, page: 1 });
    load();
  };
  const setCategory = (id) => apply({ category: id });
  const setBrand = (id) => apply({ brand: id });
  const setSort = (value) => apply({ sort: value });
  const setPrice = (key, value) => {
    setShopFilters({ [key]: value, page: 1 });
    clearTimeout(priceTimer.current);
    priceTimer.current = setTimeout(load, 600);
  };
  const goPage = (page) => {
    setShopFilters({ page });
    load();
    window.scrollTo(0, 0);
  };
  const clearSearchWord = () => {
    try {
      localStorage.removeItem("searchWord");
    } catch (e) {}
    apply({});
  };
  const clearAll = () => {
    try {
      localStorage.removeItem("searchWord");
    } catch (e) {}
    resetShopFilters();
    load();
  };

  const searchWord = readSearchWord();
  const categoryName = categories.find((c) => c._id === filters.category)?.name || "";
  const brandName = brands.find((b) => b._id === filters.brand)?.name || "";
  const hasPrice = Number(filters.priceFrom) > 0 || Number(filters.priceTo) > 0;
  const activeCount =
    (filters.category ? 1 : 0) + (filters.brand ? 1 : 0) + (hasPrice ? 1 : 0) + (searchWord ? 1 : 0);

  return {
    filters,
    items,
    loading,
    failed,
    results,
    currentPage: pagination?.currentPage || 1,
    pageCount: pagination?.numberOfPages || 0,
    categories,
    brands,
    categoryName,
    brandName,
    searchWord,
    hasPrice,
    activeCount,
    setCategory,
    setBrand,
    setSort,
    setPrice,
    goPage,
    clearSearchWord,
    clearAll,
  };
};

export default UseShopPageHook;
