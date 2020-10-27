import {
  REGISTER_SELLER_SUCCESS,
  REGISTER_SELLER_FAIL,
  LOGIN_SELLER_SUCCESS,
  LOGIN_SELLER_FAIL,
  SELLER_LOADED,
  SELLER_AUTH_ERROR,
  LOGOUT_SELLER_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  seller: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case REGISTER_SELLER_SUCCESS:
    case LOGIN_SELLER_SUCCESS:
      localStorage.setItem('token', payload.token);

      return {
        ...state,
        ...payload,

        isAuthenticated: true,
        isLoading: false,
      };

    case SELLER_LOADED:
      return {
        ...state,

        isAuthenticated: true,
        isLoading: false,
        seller: payload,
      };

    case REGISTER_SELLER_FAIL:
    case LOGIN_SELLER_FAIL:
    case SELLER_AUTH_ERROR:
    case LOGOUT_SELLER_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        seller: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
}
