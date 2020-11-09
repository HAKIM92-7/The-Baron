import {
  PRODUCT_ERROR,
  PRODUCT_CREATED,
  GET_PRODUCTS,
  GET_SELLER_PRODUCTS,
  CLEAR_SELLER_PRODUCTS,
  GET_PRODUCT,
  PRODUCT_DELETED,
  PRODUCT_UPDATED,
  CLEAR_PRODUCT,
  ADD_TO_BASKET,
  DELETE_FROM_BASKET,
  CLEAR_BASKET,
  IMAGES_UPLOADED,
  UPLOAD_ERROR
} from '../actions/types';

const initialState = {
  products: [],
  sellerProducts: [],
  basket: [],
  product: null,
  loading: true,
  uploads:[],
  error: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case PRODUCT_CREATED:
    case GET_PRODUCT:
    case PRODUCT_UPDATED:
      return {
        ...state,
        product: payload,
        loading: false,
      };

    

    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };

    case GET_SELLER_PRODUCTS:
      return {
        ...state,
        sellerProducts: payload,
        loading: false,
      };
    case CLEAR_SELLER_PRODUCTS:
      return {
        ...state,
        sellerProducts: [],
        loading: false,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null,
        loading: false,
      };
    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, payload],
        loading: false,
      };
    case DELETE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((el, index) => index !== payload),
        loading: false,
      };

    case PRODUCT_DELETED:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_BASKET:
      return {
        ...state,
        basket: [],
        loading: false,
      };
    case PRODUCT_ERROR:
    case UPLOAD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
