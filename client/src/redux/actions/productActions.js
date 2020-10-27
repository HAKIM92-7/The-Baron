import { setAlert } from './alertActions';
import axios from 'axios';
import {
  PRODUCT_CREATED,
  PRODUCT_ERROR,
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
} from './types';

// Add product
export const addProduct = (formData, history) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      '/api/products',
      formData,
      tokenConfig(getState)
    );

    dispatch({
      type: PRODUCT_CREATED,
      payload: res.data,
    });
    history.push('/dashboard');
    dispatch(setAlert('Product Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET ALL PRODUCTS

export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('api/products');

    dispatch({
      type: GET_PRODUCTS,

      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.message.statusText, error: err.message.status },
    });
  }
};

// GET PRODUCT BY PRODUCT ID

export const getProductByProductId = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`api/products/${productId}`);

    dispatch({
      type: GET_PRODUCT,

      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.message.statusText, error: err.message.status },
    });
  }
};

// GET MY PRODUCTS

export const getMyProducts = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      'api/products/myproducts/me',
      tokenConfig(getState)
    );

    dispatch({
      type: GET_SELLER_PRODUCTS,

      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.message.statusText, error: err.message.status },
    });
  }
};

//UPDATE PRODUCT

export const updateProduct = (product_id, formData, history) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.put(
      `/api/products/${product_id}`,
      formData,
      tokenConfig(getState)
    );

    dispatch({
      type: PRODUCT_UPDATED,
      payload: res.data,
    });
    history.push('/dashboard');
    dispatch(setAlert('Product Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET PRODUCTS by seller id

export const getProductsBySeller = (sellerId) => async (dispatch) => {
  try {
    const res = await axios.get(`api/products/seller/${sellerId}`);

    dispatch({
      type: GET_SELLER_PRODUCTS,

      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.message.statusText, error: err.message.status },
    });
  }
};

// DELETE PRODUCT

export const deleteProduct = (product_id) => async (dispatch, getState) => {
  if (window.confirm('are you sure to delete this product?')) {
    try {
      const res = await axios.delete(
        `api/products/${product_id}`,
        tokenConfig(getState)
      );

      dispatch({
        type: PRODUCT_DELETED,
      });

      dispatch(getMyProducts());

      dispatch(setAlert('Product removed', 'success'));
    } catch (err) {
      dispatch({
        type: PRODUCT_ERROR,
        payload: { msg: err.message.statusText, status: err.message.status },
      });
    }
  }
};

// CLEAR SELLER PRODUCTS

export const clearSellerProducts = () => (dispatch) => {
  dispatch({ type: CLEAR_SELLER_PRODUCTS });
};

// ADD TO BASKET

export const addToBasket = (product, quantity, total_price) => (dispatch) => {
  dispatch({
    type: ADD_TO_BASKET,
    payload: { product, quantity, total_price },
  });
  dispatch(setAlert('Product added to basket', 'success'));
};

// REMOVE FROM BASKET

export const deleteFromBasket = (id) => (dispatch) => {
  dispatch({
    type: DELETE_FROM_BASKET,
    payload: id,
  });
};

// CLEAR BASKET

export const clearBasket = () => (dispatch) => {
  dispatch({
    type: CLEAR_BASKET,
  });
};

// CLEAR PRODUCT
export const clearProduct = () => (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT });
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
