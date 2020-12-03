import axios from 'axios';
import { setAlert } from './alertActions';
import { logoutUser, loadUser, loginUser } from './authActions';
import { getProductsBySeller } from './productActions';

import {
  REGISTER_SELLER_SUCCESS,
  REGISTER_SELLER_FAIL,
  LOGIN_SELLER_FAIL,
  LOGIN_SELLER_SUCCESS,
  SELLER_LOADED,
  SELLER_AUTH_ERROR,
  LOGOUT_SELLER_SUCCESS,
  CLEAR_SHOP,
  CLEAR_SELLER_PRODUCTS,
} from './types';
import { clearShop, reloadShop } from './shopActions';
import { clearSellerOrders } from './orderActions';

//REGISTER SELLER

export const registerSeller = ({
  firstname,
  lastname,
  email,
  password,
}) => async (dispatch) => {
  //Headers

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body

  const body = JSON.stringify({ firstname, lastname, email, password });

  try {
    const res = await axios.post('/api/seller', body, config);
    dispatch({
      type: REGISTER_SELLER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger', 15000));
      });
    }

    dispatch({ type: REGISTER_SELLER_FAIL });
  }
};

//LOGIN SELLER----------------------------------------------------------------------------------------------------------------------

export const loginSeller = ({ email, password }) => async (dispatch) => {
  //Headers

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/authSeller', body, config);
    dispatch({
      type: LOGIN_SELLER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({ type: LOGIN_SELLER_FAIL });
  }
};

// LOAD SELLER ----------------------------------------------------------------------------------------------------------

export const loadSeller = () => async (dispatch, getState) => {
  // user loading

  try {
    const res = await axios.get(
      '/api/authSeller/seller',
      tokenConfig(getState)
    );
    if (res) {
      dispatch({
        type: SELLER_LOADED,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({ type: SELLER_AUTH_ERROR });
  }
};

// LOGOUT SELLER  ----------------------------------------------------------------------------------------------------------

export const logoutSeller = () => (dispatch) => {
  dispatch({ type: LOGOUT_SELLER_SUCCESS });
  dispatch({ type: CLEAR_SHOP });
  dispatch(clearSellerOrders());
  dispatch(logoutUser());
  dispatch({ type: CLEAR_SELLER_PRODUCTS });
};

// setup config/headers and token-------------------------------------------------------------------------------------------------------------------

export const tokenConfig = (getState) => {
  const token = getState().authSeller.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
