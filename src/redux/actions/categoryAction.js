import {
  GET_ALL_CATEGORY,
  GET_ERROR,
  CREATE_CATEGORY,
  GET_ONE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../type";
import {useGetData} from "../../hooks/useGetData";
import { useInsertDataWithImage } from "../../hooks/useinsertData";
import { useUpdateData } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";
// get All Category
 export const getAllCategory = (limit) => async (dispatch) => {
   try {
     const response = await useGetData(
       `/api/v1/categories?limit=${limit}`,
     );
     dispatch({
       type: GET_ALL_CATEGORY,
       payload: response,
     });
   } catch (e) {
     dispatch({
       type: GET_ERROR,
       payload: "Error" + e,
     });
   }
 };
 // get One Category with id
 export const getOneCategory = (id) => async (dispatch) => {
   try {
     const response = await useGetData(
       `/api/v1/categories/${id}`,
     );
     dispatch({
       type: GET_ONE_CATEGORY,
       payload: response,
     });
   } catch (e) {
     dispatch({
       type: GET_ERROR,
       payload: "Error" + e,
     });
   }
 };

//get All category with Pagenation
 export const getAllCategoryPage = (page) => async (dispatch) => {
  try {
    //const res = await baseUrl.get("/api/v1/categories");
    const response = await useGetData(`/api/v1/categories?limit=6&page=${page}`)
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

//Create Category
 export const createCategory = (formData) => async (dispatch) => {
  try {
    //const res = await baseUrl.get("/api/v1/categories");
    const response = await useInsertDataWithImage(`/api/v1/categories`,formData)
    dispatch({
      type: CREATE_CATEGORY,
      payload: response,
      loading:true
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};


// Update Category (real endpoint: PUT /api/v1/categories/:id — already existed in backend, no frontend action before)
export const updateCategory = (id, body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/categories/${id}`, body);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: e.response,
    });
  }
};

// Delete Category (real endpoint: DELETE /api/v1/categories/:id)
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETE_CATEGORY,
      payload: e.response,
    });
  }
};
