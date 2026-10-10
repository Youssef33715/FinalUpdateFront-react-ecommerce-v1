export const GET_ERROR = "GET_ERROR";
export const GET_ALL_CATEGORY = "GET_ALL_CATEGORY";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_ONE_CATEGORY = "GET_ONE_CATEGORY";
///////////////////////////////////////// =>BRaNd
export const GET_ALL_BRAND = "GET_ALL_BRAND";
export const CREATE_BRAND = "CREATE_BRAND";
export const GET_ONE_BRAND = "GET_ONE_BRAND";

/////////////////////
export const CREATE_SUB_CATEGORY = "CREATE_SUB_CATEGORY";
////////////
export const GET_SUB_CATEGORY = "GET_SUB_CATEGORY";
////////////////////
// => productS
export const CREATE_PRODUCTS = "CREATE_PRODUCTS";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_DETALIS = "GET_PRODUCT_DETALIS";
export const GET_PRODUCT_LIKE = "GET_PRODUCT_LIKE";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const GET_ALL_PRODUCTS_CATEGORY = "GET_ALL_PRODUCTS_CATEGORY";
export const GET_ALL_PRODUCTS_BRAND = "GET_ALL_PRODUCTS_BRAND";

////////////////=>USER AUTHENCATiON
export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const LOGIN_USER = "LOGIN_USER";
export const GET_CURERNT_USER = "GET_CURERNT_USER";
export const FORGET_PASSWORD = "FORGET_PASSWORD";
export const VERIFY_PASSWORD = "VERIFY_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD";


///////////////////////////Review
export const CREATE_REVIEW = "CREATE_REVIEW";
export const ALL_REVIEW_PRODUCT = "ALL_REVIEW_PRODUCT";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const UPDATE_REVIEW = "UPDATE_REVIEW";
///////////////WishList
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
export const USER_WISHLIST = "USER_WISHLIST";
////////////////////COUPONS
export const ADD_COUPON = "ADD_COUPON";
export const GET_ALL_COUPON = "GET_ALL_COUPON";
export const DELETE_COUPON = "DELETE_COUPON";
export const GET_ONE_COUPON = "GET_ONE_COUPON";
export const UPDATE_COUPON = "UPDATE_COUPON";
///////////////ADDRESS
export const ADD_USER_ADDRESS = "ADD_USER_ADDRESS";
export const GET_ALL_USER_ADDRESS = "GET_ALL_USER_ADDRESS";
export const DELETE_USER_ADDRESS = "DELETE_USER_ADDRESS";
export const GET_ONE_USER_ADDRESS = "GET_ONE_USER_ADDRESS";
export const UPDATE_USER_ADDRESS = "UPDATE_USER_ADDRESS";
////////////////////CART
export const ADD_TO_CART = "ADD_TO_CART";
export const GET_ALL_USER_CART = "GET_ALL_USER_CART";
export const ClEAR_ALL_USER_CART = "ClEAR_ALL_USER_CART";
export const DELETE_ITEM_FROM_CART = "DELETE_ITEM_FROM_CART";
export const UPDATE_ITEM_CART = "UPDATE_ITEM_CART";
export const APPLAY_COUPON_CART = "APPLAY_COUPON_CART";
/// *********** ORDERS***********
export const CREATE_ORDER_CASH = "CREATE_ORDER_CASH";
export const CREATE_ORDER_CARD = "CREATE_ORDER_CARD";
export const GET_ALL_ORDER = "GET_ALL_ORDER";
export const GET_ONE_ORDER = "GET_ONE_ORDER";
export const UPDATE_ORDER_PAY = "UPDATE_ORDER_PAY";
export const UPDATE_ORDER_DELIVER = "UPDATE_ORDER_DELIVER";

/// *********** ADMIN MODERNIZATION (new, additive only) ***********
// Category admin edit/delete
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
// Brand admin edit/delete
export const UPDATE_BRAND = "UPDATE_BRAND";
export const DELETE_BRAND = "DELETE_BRAND";
// SubCategory admin list/edit/delete
export const GET_ALL_SUB_CATEGORY_ADMIN = "GET_ALL_SUB_CATEGORY_ADMIN";
export const UPDATE_SUB_CATEGORY = "UPDATE_SUB_CATEGORY";
export const DELETE_SUB_CATEGORY = "DELETE_SUB_CATEGORY";
// Users (admin) - real backend /api/v1/users, no frontend action existed before
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ONE_USER = "GET_ONE_USER";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
// Reviews (admin) - real backend GET /api/v1/reviews (top-level, all reviews)
export const GET_ALL_REVIEWS_ADMIN = "GET_ALL_REVIEWS_ADMIN";
