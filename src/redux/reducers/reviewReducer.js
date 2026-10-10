import { ALL_REVIEW_PRODUCT, CREATE_REVIEW, DELETE_REVIEW,UPDATE_REVIEW, GET_ALL_REVIEWS_ADMIN } from "../type";

const inital = {
  createView: [],
  allReviewProduct:[],
  allReviewsAdmin:[],
  deleteReview:[],
  updateReview:[],
  loading: true,
};

const reviewReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return {
        ...state,
        createView: action.payload,
        loading: false,
      };
    case ALL_REVIEW_PRODUCT:
      return {
        ...state,
        allReviewProduct: action.payload,
        loading: false,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        deleteReview: action.payload,
        loading: false,
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        updateReview: action.payload,
        loading: false,
      };
    case GET_ALL_REVIEWS_ADMIN:
      return {
        ...state,
        allReviewsAdmin: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default reviewReducer ;
