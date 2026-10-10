import {
  CREATE_REVIEW,
  ALL_REVIEW_PRODUCT,
  DELETE_REVIEW,
  UPDATE_REVIEW,
  GET_ALL_REVIEWS_ADMIN,
} from "../type";
import { useInsertData } from "../../hooks/useinsertData";
import { useGetDataToken } from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData"
import  {useUpdateData} from "../../hooks/useUpdateData"
// Create review
export const createReview = (prodId,body) => async (dispatch) => {
  try {
    const response = await useInsertData(`api/v1/products/${prodId}/reviews`,body);
    dispatch({
      type: CREATE_REVIEW,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: CREATE_REVIEW,
      payload:  e.response,
    });
  }
};
// get all review to one product
export const allReviewProduct = (prodId,page,limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`api/v1/products/${prodId}/reviews?page=${page}&limit=${limit}`);
    dispatch({
      type: ALL_REVIEW_PRODUCT,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: ALL_REVIEW_PRODUCT,
      payload: e.response,
    });
  }
};
// Delete Review
export const deleteReviewonProduct = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`api/v1/reviews/${id}`,);
    dispatch({
      type: DELETE_REVIEW,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETE_REVIEW,
      payload: e.response,
    });
  }
};
// Edit Review
export const updateReviewOnProduct = (id,body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`api/v1/reviews/${id}`,body);
    dispatch({
      type: UPDATE_REVIEW,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_REVIEW,
      payload: e.response,
    });
  }
};

// Admin: get ALL reviews across all products (real endpoint: GET /api/v1/reviews, top-level, no productId — confirmed to exist and return all reviews with pagination/sort/search)
export const getAllReviewsAdmin = (page, limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`api/v1/reviews?page=${page || 1}&limit=${limit || 10}&sort=-createdAt`);
    dispatch({
      type: GET_ALL_REVIEWS_ADMIN,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_REVIEWS_ADMIN,
      payload: e.response,
    });
  }
};
