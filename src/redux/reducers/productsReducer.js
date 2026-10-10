

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

const inital = {
  products: [],
  allProducts:[],
  oneProduct:[],
  productLike:[],
  deleteProducts:[],
  updateProducts:[],
  allProductCategory:[],
  allProductsBrand:[],
  loading: true,
};

const productsReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        loading: false,
      };
    case GET_PRODUCT_DETALIS:
      return {
        ...state,
        oneProduct: action.payload,
        loading: false,
      };
    case GET_PRODUCT_LIKE:
      return {
        ...state,
        productLike: action.payload,
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        deleteProducts: action.payload,
        loading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProducts: action.payload,
        loading: false,
      };
    case GET_ALL_PRODUCTS_CATEGORY:
      return {
        ...state,
        allProductCategory: action.payload,
        loading: false,
      };
    case GET_ALL_PRODUCTS_BRAND:
      return {
        ...state,
        allProductsBrand: action.payload,
        loading: false,
      };

    case GET_ERROR:
      return {
        loading: true,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
