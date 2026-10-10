import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersFiltered } from "../../redux/actions/orderAction";

const LIMIT = 10;

const AdminOrdersManageHook = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [paidFilter, setPaidFilter] = useState(""); // "", "true", "false"
  const [deliveredFilter, setDeliveredFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const getAllOrders = useSelector((state) => state.orderReducer.getAllOrders);

  const buildQuery = useCallback(
    (targetPage) => {
      const params = new URLSearchParams();
      if (paidFilter) params.set("ispaid", paidFilter);
      if (deliveredFilter) params.set("isDelivered", deliveredFilter);
      params.set("page", targetPage || page);
      params.set("limit", LIMIT);
      return params.toString();
    },
    [paidFilter, deliveredFilter, page],
  );

  const fetchOrders = useCallback(
    async (targetPage) => {
      setLoading(true);
      await dispatch(getAllOrdersFiltered(buildQuery(targetPage)));
      setLoading(false);
    },
    [dispatch, buildQuery],
  );

  useEffect(() => {
    fetchOrders(1);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPage(1);
    fetchOrders(1);
    // eslint-disable-next-line
  }, [paidFilter, deliveredFilter]);

  const onPageChange = (newPage) => {
    setPage(newPage);
    fetchOrders(newPage);
  };

  return {
    orders: getAllOrders?.data || [],
    totalResults: getAllOrders?.results ?? 0,
    pageCount: getAllOrders?.paginationResult?.numberOfPages || 0,
    loading,
    onPageChange,
    paidFilter,
    setPaidFilter,
    deliveredFilter,
    setDeliveredFilter,
  };
};

export default AdminOrdersManageHook;
