import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  PRODUCT_LOADING,
  RESET_PRODUCT_STATE,
  VOTE_PRODUCT_SUCCESS,
  UNVOTE_PRODUCT_SUCCESS,
  VOTE_PRODUCT_ERROR,
  UNVOTE_PRODUCT_ERROR,
  GET_PRODUCT_ERROR
} from '../../types/productTypes';

const ProductReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        productLoading: true
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productLoading: false,
        products: action.payload,
        productError: null
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: action.payload,
        productLoading: false,
        productError: null
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        productError: null,
        products: [...state.products, action.payload],
        productLoading: false
      };
    case VOTE_PRODUCT_SUCCESS:
    case UNVOTE_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        productLoading: false,
        productError: null,
        products: state.products.map((item) => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        })
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productLoading: false,
        productError: null,
        products: state.products.filter((item) => item.id === action.payload),
        currentProduct: {}
      };
    case RESET_PRODUCT_STATE:
      return {
        productLoading: false,
        productError: null,
        products: null,
        currentProduct: {}
      };
    case VOTE_PRODUCT_ERROR:
    case UNVOTE_PRODUCT_ERROR:
    case GET_PRODUCTS_ERROR:
    case ADD_PRODUCT_ERROR:
    case UPDATE_PRODUCT_ERROR:
    case DELETE_PRODUCT_ERROR:
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        productLoading: false,
        productError: action.payload
      };
    default:
      return state;
  }
};

export default ProductReducer;
