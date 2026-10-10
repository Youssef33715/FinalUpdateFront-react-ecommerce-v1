import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSearch, deleteProducts } from "../../redux/actions/productsAction";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";

const LIMIT = 10;

// Builds a real backend query string from the current UI state and calls the
// existing getAllProductsSearch action (was written but never wired to a
// screen before). Uses only fields the Product model / apiFeatures already
// support: keyword, category, brand, sort, page, limit.
const AdminProductsManageHook = () => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const allProducts = useSelector((state) => state.allproducts.allProducts);
  const categoryState = useSelector((state) => state.allCategory.category);
  const brandState = useSelector((state) => state.allbrand.brand);

  const buildQuery = useCallback(
    (targetPage) => {
      const params = new URLSearchParams();
      if (keyword) params.set("keyword", keyword);
      if (category) params.set("category", category);
      if (brand) params.set("brand", brand);
      if (sort) params.set("sort", sort);
      params.set("page", targetPage || page);
      params.set("limit", LIMIT);
      return params.toString();
    },
    [keyword, category, brand, sort, page],
  );

  const fetchProducts = useCallback(
    async (targetPage) => {
      setLoading(true);
      await dispatch(getAllProductsSearch(buildQuery(targetPage)));
      setLoading(false);
    },
    [dispatch, buildQuery],
  );

  // initial load + filter dropdown data (real category/brand lists, already used site-wide)
  useEffect(() => {
    dispatch(getAllCategory(100));
    dispatch(getAllBrand(100));
    fetchProducts(1);
    // eslint-disable-next-line
  }, []);

  // re-fetch whenever a filter/sort/search changes (reset to page 1)
  useEffect(() => {
    setPage(1);
    fetchProducts(1);
    // eslint-disable-next-line
  }, [keyword, category, brand, sort]);

  const onPageChange = (newPage) => {
    setPage(newPage);
    fetchProducts(newPage);
  };

  const items = allProducts?.data || [];
  const pageCount = allProducts?.paginationResult?.numberOfPages || 0;
  const totalResults = allProducts?.results ?? items.length;

  const askDelete = (product) => setDeleteTarget(product);
  const cancelDelete = () => setDeleteTarget(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await dispatch(deleteProducts(deleteTarget._id));
      setDeleteTarget(null);
      await fetchProducts(page);
    } finally {
      setDeleting(false);
    }
  };

  return {
    items,
    loading,
    pageCount,
    page,
    totalResults,
    onPageChange,
    keyword,
    setKeyword,
    category,
    setCategory,
    brand,
    setBrand,
    sort,
    setSort,
    categories: categoryState?.data || [],
    brands: brandState?.data || [],
    deleteTarget,
    askDelete,
    cancelDelete,
    confirmDelete,
    deleting,
  };
};

export default AdminProductsManageHook;
