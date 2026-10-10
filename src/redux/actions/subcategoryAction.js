import {  GET_ERROR, CREATE_SUB_CATEGORY,GET_SUB_CATEGORY, GET_ALL_SUB_CATEGORY_ADMIN, UPDATE_SUB_CATEGORY, DELETE_SUB_CATEGORY } from "../type";
import {useGetData} from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useinsertData";
import { useUpdateData } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";

//Create SubCategory
export const createSubCategory = (data) => async (dispatch) => {
  try {
    //const res = await baseUrl.get("/api/v1/categories");
    const response = await useInsertData(
      `/api/v1/subcategories`,
      data,
    );
    dispatch({
      type: CREATE_SUB_CATEGORY,
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
///////////////////////
//get SubCategory depend in cat id
export const getOneCategory = (id) => async (dispatch) => {
  try {
    //const res = await baseUrl.get("/api/v1/categories");
    const response = await useGetData(
      `/api/v1/categories/${id}/subcategories`,
    );
    dispatch({
      type: GET_SUB_CATEGORY,
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

// Get ALL subcategories, top-level, no categoryId filter (real endpoint: GET /api/v1/subcategories — existed in backend, no admin-list frontend action before)
export const getAllSubCategoriesAdmin = (page, limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/subcategories?page=${page || 1}&limit=${limit || 10}`);
    dispatch({
      type: GET_ALL_SUB_CATEGORY_ADMIN,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_SUB_CATEGORY_ADMIN,
      payload: e.response,
    });
  }
};

// Update SubCategory (real endpoint: PUT /api/v1/subcategories/:id)
export const updateSubCategory = (id, body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/subcategories/${id}`, body);
    dispatch({
      type: UPDATE_SUB_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_SUB_CATEGORY,
      payload: e.response,
    });
  }
};

// Delete SubCategory (real endpoint: DELETE /api/v1/subcategories/:id)
export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/subcategories/${id}`);
    dispatch({
      type: DELETE_SUB_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETE_SUB_CATEGORY,
      payload: e.response,
    });
  }
};
