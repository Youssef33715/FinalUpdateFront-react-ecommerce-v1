import { CREATE_ORDER_CASH, CREATE_ORDER_CARD } from "../type";

const inital = {
  createOrderCash: [],
  createOrderCard:[],
};

const checkoutReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_ORDER_CASH:
      return {
        ...state,
        createOrderCash: action.payload,
        loading: false,
      };
    case CREATE_ORDER_CARD:
      return {
        ...state,
        createOrderCard: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default checkoutReducer;
