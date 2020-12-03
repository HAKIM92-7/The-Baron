import {
  ORDER_PASSED,
  ORDER_FAIL,
  GET_USER_ORDERS,
  USER_ORDERS_FAIL,
  CLEAR_USER_ORDERS,
  GET_ORDER,
  CLEAR_ORDER,
  GET_SELLER_ORDERS,
  SELLER_ORDERS_FAIL,
  CLEAR_SELLER_ORDERS
} from '../actions/types';

const initialState = {
  order:null,
  userOrders: [],
  sellerOrders : [] , 
  loading: true,
  error: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case ORDER_PASSED:
    case GET_ORDER:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case GET_USER_ORDERS:
      return {
        ...state,
        userOrders: payload,
        loading: false,
      };
    case GET_SELLER_ORDERS:
      return {
      ...state , 
      sellerOrders:payload,
      loading: false
      }
    case CLEAR_USER_ORDERS:
      return {
        ...state,
        userOrders: [],
        loading: true,
      };
    case CLEAR_SELLER_ORDERS:
      return {
      ...state ,
      sellerOrders:[]
      }
      case CLEAR_ORDER:
        return {
        ...state ,
        order:null,
        loading:false

        }
    case ORDER_FAIL:
    case USER_ORDERS_FAIL:
    case SELLER_ORDERS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
