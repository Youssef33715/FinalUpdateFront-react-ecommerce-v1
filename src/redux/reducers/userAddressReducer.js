import {
  ADD_USER_ADDRESS,
  GET_ALL_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  GET_ONE_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
} from "../type";

const inital = {
  addUserAddress: [],
  allAddresses: [],
  deleteUserAddress:[],
  oneAddress:[],
  updateAddress:[]
};

const userAddressReducer = (state = inital, action) => {
  switch (action.type) {
    case ADD_USER_ADDRESS:
      return {
        ...state,
        addUserAddress: action.payload,
        loading: false,
      };
    case GET_ALL_USER_ADDRESS:
      return {
        ...state,
        allAddresses: action.payload,
        loading: false,
      };
    case DELETE_USER_ADDRESS:
      return {
        ...state,
        deleteUserAddress: action.payload,
        loading: false,
      };
    case GET_ONE_USER_ADDRESS:
      return {
        ...state,
        oneAddress: action.payload,
        loading: false,
      };
    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        updateAddress: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default userAddressReducer;
