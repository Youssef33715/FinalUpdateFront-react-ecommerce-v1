import {
  GET_ERROR,
  CREATE_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETALIS,
  GET_PRODUCT_LIKE,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_ALL_PRODUCTS_CATEGORY,
  GET_ALL_PRODUCTS_BRAND,
} from "../type";
import { useInsertDataWithImage } from "../../hooks/useinsertData";
import {useGetData} from "../../hooks/useGetData";
import useDeleteData from "../../hooks/useDeleteData";
import { useUpdateDataWithImage } from "../../hooks/useUpdateData";

//Create product
export const createProduct = (formatdata) => async (dispatch) => {
  try {
    //const res = await baseUrl.get("/api/v1/categories");
    const response = await useInsertDataWithImage(`/api/v1/products`, formatdata);
    dispatch({
      type: CREATE_PRODUCTS,
      payload: response.status,
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
// get all products 
export const getAllProducts = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?limit=${limit}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
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
// get all products by category 
export const getAllProductsByCategory = (page,limit,categoryID) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/products?limit=${limit}&category=${categoryID}&page=${page}`,
    );
    dispatch({
      type: GET_ALL_PRODUCTS_CATEGORY,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_PRODUCTS_CATEGORY,
      payload:  e.response,
    });
  }
};
// get all products by Brand 
export const getAllProductsByBrand = (page,limit,brandID) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/products?limit=${limit}&brand=${brandID}&page=${page}`,
    );
    dispatch({
      type: GET_ALL_PRODUCTS_BRAND,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_PRODUCTS_BRAND,
      payload:  e.response,
    });
  }
};


// get all products with pagination with pages number 
export const getAllProductsPage = (page,limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?page=${page}&limit=${limit}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
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
//////////////////////
// get all products with pagination with quary string 
export const getAllProductsSearch = (queryString) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?${queryString}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
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

/////////////////////////
// get one product with id
export const getOneProduct = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products/${id}`);
    dispatch({
      type: GET_PRODUCT_DETALIS,
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
/////////////////////////
// get one product with id
export const getProductLike = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/products?category=${id}`);
    dispatch({
      type: GET_PRODUCT_LIKE,
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
/////////////////////////
// Delete  product with id
export const deleteProducts = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/products/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
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
/////////////////////////
// Update  product with id
export const updateProducts = (id,data) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(`/api/v1/products/${id}`,data);
    dispatch({
      type: UPDATE_PRODUCT,
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
