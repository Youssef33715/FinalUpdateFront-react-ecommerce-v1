import {
  GET_ALL_ORDER,
  GET_ONE_ORDER,
  UPDATE_ORDER_PAY,
  UPDATE_ORDER_DELIVER,
} from "../type";
import { useGetDataToken } from "../../hooks/useGetData";
import { useUpdateData } from "../../hooks/useUpdateData";

// Get all orders
export const getAllOrders = (page,limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/orders?limit=${limit}&page=${page}`);
    dispatch({
      type: GET_ALL_ORDER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_ORDER,
      payload: e.response,
    });
  }
};
// Admin: get orders filtered by real, existing Order fields (ispaid/isDelivered
// are plain booleans on the schema, filtered directly by the backend's generic
// filter() — no new endpoint). Kept separate from getAllOrders so the User
// side's own orders page (which uses getAllOrders via UserGetAllOrderHook)
// is not touched at all.
export const getAllOrdersFiltered = (queryString) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/orders?${queryString}`);
    dispatch({
      type: GET_ALL_ORDER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_ORDER,
      payload: e.response,
    });
  }
};
// Get one orders
export const getOneOrder = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/orders/${id}`);
    dispatch({
      type: GET_ONE_ORDER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ONE_ORDER,
      payload: e.response,
    });
  }
};
// change order pay
export const changeOrderPay = (id) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/orders/${id}/pay`);
    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: e.response,
    });
  }
};
// change order deliver
export const changeOrderDeliver = (id) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/orders/${id}/deliver`);
    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: e.response,
    });
  }
};
