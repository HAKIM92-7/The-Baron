import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import authSeller from './authSellerReducer';
import shop from './shopReducer';
import product from './productReducer';
import order from './orderReducer';
const rootReducer = combineReducers({
  alert,
  auth,
  authSeller,
  shop,
  product,
  order,
});
export default rootReducer;
