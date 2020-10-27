import { GET_SHOP, SHOP_FAIL, CLEAR_SHOP, GET_SHOPS } from '../actions/types';

const initialState = {
  shop: null,

  shoptoshow: null,

  shops: [],

  errors: {},

  loading: true,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_SHOP:
      return {
        ...state,
        shop: payload,
        loading: false,
      };

    case GET_SHOPS:
      return {
        ...state,
        shops: payload,
        loading: false,
      };

    case SHOP_FAIL:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    case CLEAR_SHOP:
      return {
        ...state,
        shop: null,
        loading: false,
      };

    default:
      return state;
  }
}
