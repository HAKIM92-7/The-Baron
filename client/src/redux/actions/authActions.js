import axios from 'axios';
import { setAlert } from './alertActions';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_SELLER_SUCCESS,
} from './types';
import { logoutSeller } from './authSellerActions';

//REGISTER USER

export const registerUser = ({
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
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
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

    dispatch({ type: REGISTER_FAIL });
  }
};

//LOGIN USER----------------------------------------------------------------------------------------------------------------------

export const loginUser = ({ email, password }) => async (dispatch) => {
  //Headers

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

// LOAD USER ----------------------------------------------------------------------------------------------------------

export const loadUser = () => async (dispatch, getState) => {
  // user loading

  try {
    const res = await axios.get('/api/auth/user', tokenConfig(getState));
    if (res) {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// LOGOUT USER  ----------------------------------------------------------------------------------------------------------

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch({ type: LOGOUT_SELLER_SUCCESS });
};

// setup config/headers and token-------------------------------------------------------------------------------------------------------------------

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

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
