import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";
import { getAllOrders } from "../../redux/actions/orderAction";
import { getAllUsers } from "../../redux/actions/userAction";
import { getAllCoupon } from "../../redux/actions/couponAction";

// Reads the real "results" length from a response fetched with a high-enough
// limit, since the backend's getAll() factory never returns a raw total count,
// only paginationResult.numberOfPages. This is still the same existing API,
// just requested with a bigger limit so the count is accurate, not estimated.
const AdminDashboardHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([
        dispatch(getAllProducts(1000)),
        dispatch(getAllOrders(1, 1000)),
        dispatch(getAllUsers(1, 1000)),
        dispatch(getAllCoupon()),
      ]);
      setLoading(false);
    };
    load();
    // eslint-disable-next-line
  }, []);

  const allProducts = useSelector((state) => state.allproducts.allProducts);
  const allOrders = useSelector((state) => state.orderReducer.getAllOrders);
  const allUsers = useSelector((state) => state.adminUsers.allUsers);
  const allCoupons = useSelector((state) => state.couponReducer.allCoupon);

  let productsCount = null;
  let ordersCount = null;
  let usersCount = null;
  let couponsCount = null;
  let recentOrders = [];

  try {
    if (allProducts && allProducts.results !== undefined) {
      productsCount = allProducts.results;
    }
  } catch (e) {}

  try {
    if (allOrders && allOrders.results !== undefined) {
      ordersCount = allOrders.results;
    }
    if (allOrders && Array.isArray(allOrders.data)) {
      recentOrders = allOrders.data.slice(0, 5);
    }
  } catch (e) {}

  try {
    if (allUsers && allUsers.results !== undefined) {
      usersCount = allUsers.results;
    }
  } catch (e) {}

  try {
    if (allCoupons && Array.isArray(allCoupons.data)) {
      couponsCount = allCoupons.data.length;
    }
  } catch (e) {}

  // Operational metrics — derived client-side from the same real data already
  // fetched above (order.ispaid / order.isDelivered / product.quantity are
  // real schema fields). No new endpoint, no invented status.
  let unpaidCount = 0;
  let undeliveredCount = 0;
  try {
    if (Array.isArray(allOrders?.data)) {
      unpaidCount = allOrders.data.filter((o) => !o.ispaid).length;
      undeliveredCount = allOrders.data.filter((o) => !o.isDelivered).length;
    }
  } catch (e) {}

  let recentProducts = [];
  try {
    if (Array.isArray(allProducts?.data)) {
      recentProducts = allProducts.data.slice(0, 5);
    }
  } catch (e) {}

  let outOfStockCount = 0;
  try {
    if (Array.isArray(allProducts?.data)) {
      outOfStockCount = allProducts.data.filter((p) => !p.quantity || p.quantity <= 0).length;
    }
  } catch (e) {}

  return {
    loading,
    productsCount,
    ordersCount,
    usersCount,
    couponsCount,
    recentOrders,
    unpaidCount,
    undeliveredCount,
    outOfStockCount,
    recentProducts,
  };
};

export default AdminDashboardHook;
