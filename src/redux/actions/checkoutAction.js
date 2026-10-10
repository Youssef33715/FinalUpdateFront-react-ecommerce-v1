import { CREATE_ORDER_CASH, CREATE_ORDER_CARD } from "../type";
import {  useGetDataToken } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useinsertData";
// Create order cash
export const createOrderCach = (id,body) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/orders/${id}`,body);
    dispatch({
      type: CREATE_ORDER_CASH,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_CASH,
      payload: e.response,
    });
  }
};
// Create order CARD
export const createOrderCARD = (id,body) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/orders/checkout-session/${id}`,body);
    dispatch({
      type: CREATE_ORDER_CARD,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_CARD,
      payload: e.response,
    });
  }
};
