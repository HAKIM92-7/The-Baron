import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alert';
import { loadUser } from './redux/actions/authActions';
import './App.css';
import Footer from './components/layouts/Footer';
import RegisterSeller from './components/auth/RegisterSeller';
import LoginSeller from './components/auth/LoginSeller';
import ShopForm from './components/shopForms/ShopForm';

import { loadSeller } from './redux/actions/authSellerActions';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import EditShopForm from './components/shopForms/EditShopForm';
import AllShops from './components/Shops/AllShops';
import ShopToPublic from './components/Shops/ShopToPublic';
import CreateProduct from './components/productForms/CreateProduct';
import UpdateProduct from './components/productForms/UpdateProduct';
import ProductProfile from './components/products/ProductProfile';
import Basket from './components/products/Basket';
import OrderInfos from './components/orders/OrderInfos';
import RegisterToOrder from './components/auth/RegisterToOrder';
import LoginToOrder from './components/auth/LoginToOrder';
import UserOrders from './components/orders/UserOrders';
import OrderDetails from './components/orders/OrderDetails';
import 'mdbreact/dist/css/mdb.css';


function App() {
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.authSeller.seller);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Route exact={true} path='/' component={Landing} />
      <div className='container'>
        <Alert />
       
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/registerSeller' component={RegisterSeller} />
          <Route exact path='/loginSeller' component={LoginSeller} />
          <Route exact path='/allShops' component={AllShops} />
          <Route exact path='/shopToPublic' component={ShopToPublic} />
          <PrivateRoute path='/create-shop' component={ShopForm} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/edit-shop' component={EditShopForm} />
          <PrivateRoute path='/create-product' component={CreateProduct} />
          <PrivateRoute path='/update-product' component={UpdateProduct} />
          <PrivateRoute path='/order-infos' component={OrderInfos} />
          <PrivateRoute path='/user-orders' component={UserOrders} />
          <PrivateRoute path='/order-details' component={OrderDetails} />
          <Route path='/product-profile' component={ProductProfile} />
          <Route path='/register-to-order' component={RegisterToOrder} />
          <Route path='/login-to-order' component={LoginToOrder} />
          <Route path='/basket' component={Basket} />
        </Switch>
        
         
        
      </div>
      <div id="foot">
        <Footer/>
      </div>
    
  
    </Fragment>
  );
}

export default App;
