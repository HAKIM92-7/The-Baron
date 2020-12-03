import { setAlert } from './alertActions';
import axios from 'axios';
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
  
} from './types';

import { clearBasket } from './productActions';

// Pass an order

export const passAnOrder = (
  listofproducts,
  adress_of_delivery,
  postal_code,
  telephone, 
  history
) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      'api/commande',
      {
        listofproducts: listofproducts,
        adress_of_delivery,
        postal_code,
        telephone,
      },
      tokenConfig(getState)
    );

    dispatch({
      type: ORDER_PASSED,

      payload: res.data,
    });
 history.push('/');
 window.alert('Order success !');
    dispatch(clearBasket());
   
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: ORDER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET USER ORDERS

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('api/commande/me', tokenConfig(getState));

    dispatch({
      type: GET_USER_ORDERS,

      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ORDERS_FAIL,
      payload: { msg: err.message.statusText, error: err.message.status },
    });
  }
};


//GET ORDER BY order_id

export const getOrderByOrderId = (orderId) => async (dispatch,getState) => {
  try {
    const res = await axios.get(`api/commande/${orderId}` ,tokenConfig(getState));

    dispatch({
      type: GET_ORDER,

      payload: res.data,
    });

  } 
  
  catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: ORDER_FAIL,
      payload: { msg: err.message.statusText, error: err.message.status },
    });
  }
};
//CLEAR Order
export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};

//GET SELLER ORDER BY order_id

export const getSellerOrderByOrderId = (orderId) => async (dispatch,getState) => {
  try {
    const res = await axios.get(`api/commande/${orderId}`,tokenConfigSeller(getState))

    dispatch({
      type: GET_ORDER,

      payload: res.data,
    });

  } 
  
  catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: ORDER_FAIL,
      payload: { msg: err.message.statusText, error: err.message.status },
    });
  }
};


//CLEAR USER ORDERS

export const clearUserOrders = () => (dispatch) => {
  dispatch({ type: CLEAR_USER_ORDERS });
};

//CLEAR SELLER ORDERS 

export const clearSellerOrders = () => (dispatch) => {
  dispatch({ type: CLEAR_SELLER_ORDERS});
};


// GET SELLER ORDERS

export const getSellerOrders = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('api/commande/seller', tokenConfigSeller(getState));

    dispatch({
      type: GET_SELLER_ORDERS,

      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SELLER_ORDERS_FAIL,
      payload: { msg: err.message.statusText, error: err.message.status },
    });
  }
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


export const tokenConfigSeller = (getState) => {
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



