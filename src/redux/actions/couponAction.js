import {
  ADD_COUPON,
  GET_ALL_COUPON,
  DELETE_COUPON,
  GET_ONE_COUPON,
  UPDATE_COUPON,
} from "../type";
import { useInsertData } from "../../hooks/useinsertData";
import {useGetDataToken} from "../../hooks/useGetData"
import useDeleteData from "../../hooks/useDeleteData"
import { useUpdateData} from "../../hooks/useUpdateData"
// Add Coupon
export const addCoupon = (body) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/coupons`,body);
    dispatch({
      type: ADD_COUPON,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: ADD_COUPON,
      payload: e.response,
    });
  }
};
// getAll Coupon
export const getAllCoupon = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/coupons`);
    dispatch({
      type: GET_ALL_COUPON,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_COUPON,
      payload: e.response,
    });
  }
};
// Delete Coupon
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/coupons/${id}`);
    dispatch({
      type: DELETE_COUPON,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETE_COUPON,
      payload: e.response,
    });
  }
};
// get One Coupon
export const getOneCoupon = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/coupons/${id}`);
    dispatch({
      type: GET_ONE_COUPON,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ONE_COUPON,
      payload: e.response,
    });
  }
};
// Edit Coupon
export const editCoupon = (id,body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/coupons/${id}`,body);
    dispatch({
      type: UPDATE_COUPON,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_COUPON,
      payload: e.response,
    });
  }
};
