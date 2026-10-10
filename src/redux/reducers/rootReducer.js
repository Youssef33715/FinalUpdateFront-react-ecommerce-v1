import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer"
import brandReducer from "./brandReducer";
import subcategoryReducer from "./subcategoryReducer";
import productsReducer from './productsReducer'
import authReducer from "./authReducer"
import reviewReducer from "./reviewReducer";
import addToWishListReducer from "./wishListReducer"
import couponReducer from "./couponReducer"
import userAddressReducer from "./userAddressReducer"
import cartReducer from "./cartReducer"
import checkoutReducer from "./checkoutReducer"
import orderReducer from "./orderReducer"
import userReducer from "./userReducer"
export default combineReducers({
  adminUsers: userReducer,
  allCategory: categoryReducer,
  allbrand: brandReducer,
  subCategory: subcategoryReducer,
  allproducts: productsReducer,
  authReducer: authReducer,
  reviewReducer: reviewReducer,
  addToWishListReducer: addToWishListReducer,
  couponReducer: couponReducer,
  userAddressReducer: userAddressReducer,
  cartReducer: cartReducer,
  checkoutReducer:checkoutReducer,
  orderReducer:orderReducer
});