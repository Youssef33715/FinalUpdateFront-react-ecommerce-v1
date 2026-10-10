import {
  GET_ALL_ORDER,
  GET_ONE_ORDER,
  UPDATE_ORDER_PAY,
  UPDATE_ORDER_DELIVER,
} from "../type";

const inital = {
  getAllOrders: [],
  getOneOrder:[],
  changePayOrder:[],
  changeDeliverOrder:[],
  loading: true,
};

const orderReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      return {
        ...state,
        getAllOrders: action.payload,
        loading: false,
      };
    case GET_ONE_ORDER:
      return {
        ...state,
        getOneOrder: action.payload,
        loading: false,
      };
    case UPDATE_ORDER_PAY:
      return {
        ...state,
        changePayOrder: action.payload,
        loading: false,
      };
    case UPDATE_ORDER_DELIVER:
      return {
        ...state,
        changeDeliverOrder: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
