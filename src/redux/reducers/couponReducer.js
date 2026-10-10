import {
  ADD_COUPON,
  GET_ALL_COUPON,
  DELETE_COUPON,
  GET_ONE_COUPON,
  UPDATE_COUPON,
} from "../type";

const inital = {
    addCoupon:[],
    allCoupon:[],
    deleteCoupon:[],
    oneCoupon:[],
    updateCoupon:[],
};

const couponReducer = (state = inital, action) => {
  switch (action.type) {
    case ADD_COUPON:
      return {
        ...state,
        addCoupon: action.payload,
      };
    case GET_ALL_COUPON:
      return {
        ...state,
        allCoupon: action.payload,
      };
    case DELETE_COUPON:
      return {
        ...state,
        deleteCoupon: action.payload,
      };
    case GET_ONE_COUPON:
      return {
        ...state,
        oneCoupon: action.payload,
      };
    case UPDATE_COUPON:
      return {
        ...state,
        updateCoupon: action.payload,
      };

    default:
      return state;
  }
};

export default couponReducer;
