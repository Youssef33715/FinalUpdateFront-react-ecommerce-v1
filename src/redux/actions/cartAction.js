import {
  ADD_TO_CART,
  GET_ALL_USER_CART,
  ClEAR_ALL_USER_CART,
  DELETE_ITEM_FROM_CART,
  UPDATE_ITEM_CART,
  APPLAY_COUPON_CART
} from "../type";
import { useGetDataToken } from "../../hooks/useGetData";
import { useInsertData,  } from "../../hooks/useinsertData";
import useDeleteData from "../../hooks/useDeleteData";
import { useUpdateData } from "../../hooks/useUpdateData";

//add To cart 
export const addProductToCart = (body) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/cart`, body);
    dispatch({
      type: ADD_TO_CART,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ADD_TO_CART,
      payload:  e.response,
    });
  }
};
// Get User cart 
export const getAllUserCartItems = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/cart`);
    dispatch({
      type: GET_ALL_USER_CART,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_USER_CART,
      payload: e.response,
    });
  }
};
// Clear All Cart items user
export const clearAllCartItem = () => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/cart`);
    dispatch({
      type: ClEAR_ALL_USER_CART,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: ClEAR_ALL_USER_CART,
      payload: e.response,
    });
  }
};
// Clear 1 Cart items user
export const deleteCartItem = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/cart/${id}`);
    dispatch({
      type: DELETE_ITEM_FROM_CART,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETE_ITEM_FROM_CART,
      payload: e.response,
    });
  }
};
// Update cartItem
export const updateCartItem = (id,body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/cart/${id}`,body);
    dispatch({
      type: UPDATE_ITEM_CART,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ITEM_CART,
      payload: e.response,
    });
  }
};
// Update cartItem
export const applayCouponCart = (body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/cart/applyCoupon`,body);
    dispatch({
      type: APPLAY_COUPON_CART,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: APPLAY_COUPON_CART,
      payload: e.response,
    });
  }
};
