import { GET_ALL_BRAND, GET_ERROR, CREATE_BRAND ,GET_ONE_BRAND, UPDATE_BRAND, DELETE_BRAND} from "../type";
import {useGetData} from "../../hooks/useGetData";
import { useInsertDataWithImage } from "../../hooks/useinsertData";
import { useUpdateData } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";
// get All Brand
export const getAllBrand = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands?limit=${limit}`);
    dispatch({
      type: GET_ALL_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};
// get ONE Brand
export const getOneBrand = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands/${id}`);
    dispatch({
      type: GET_ONE_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

//get All Brnad with Pagenation
export const getAllBrandPage = (page) => async (dispatch) => {
  try {
    //const res = await baseUrl.get("/api/v1/categories");
    const response = await useGetData(`/api/v1/brands?limit=6&page=${page}`);
    dispatch({
      type: GET_ALL_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};
//Create brand
export const createBrand = (formData) => async (dispatch) => {
  try {
    //const res = await baseUrl.get("/api/v1/brands");
    const response = await useInsertDataWithImage(
      `/api/v1/brands`,
      formData,
    );
    dispatch({
      type: CREATE_BRAND,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

// Update Brand (real endpoint: PUT /api/v1/brands/:id)
export const updateBrand = (id, body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/brands/${id}`, body);
    dispatch({
      type: UPDATE_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_BRAND,
      payload: e.response,
    });
  }
};

// Delete Brand (real endpoint: DELETE /api/v1/brands/:id)
export const deleteBrand = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/brands/${id}`);
    dispatch({
      type: DELETE_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETE_BRAND,
      payload: e.response,
    });
  }
};
