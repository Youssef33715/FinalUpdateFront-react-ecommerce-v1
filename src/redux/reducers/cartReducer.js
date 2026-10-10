import {
  ADD_TO_CART,
  GET_ALL_USER_CART,
  ClEAR_ALL_USER_CART,
  DELETE_ITEM_FROM_CART,
  UPDATE_ITEM_CART,
  APPLAY_COUPON_CART,
} from "../type";

const inital = {
  addToCart:[],
  getAllUserCart:[],
  clearCart:[],
  deleteItem:[],
  updateItem:[],
  applayCoupon:[],
  loading: true,
};

const cartReducer = (state = inital, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        addToCart: action.payload,
        loading: false,
      };
    case GET_ALL_USER_CART:
      return {
        ...state,
        getAllUserCart: action.payload,
        loading: false,
      };
    case ClEAR_ALL_USER_CART:
      return {
        ...state,
        clearCart: action.payload,
        loading: false,
      };
    case DELETE_ITEM_FROM_CART:
      return {
        ...state,
        deleteItem: action.payload,
        loading: false,
      };
    case UPDATE_ITEM_CART:
      return {
        ...state,
        updateItem: action.payload,
        loading: false,
      };
    case APPLAY_COUPON_CART:
      return {
        ...state,
        applayCoupon: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default cartReducer;
