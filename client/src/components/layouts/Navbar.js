import React, { Fragment,useEffect,useState} from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { logoutSeller } from '../../redux/actions/authSellerActions';
import {
  getAllShops,
  getCurrentShop,
  getShopByID,
} from '../../redux/actions/shopActions';
import {
  clearBasket,
  getMyProducts,
  getProductsBySeller,
} from '../../redux/actions/productActions';
import { getMyOrders , getSellerOrders } from '../../redux/actions/orderActions';
import Navigation from './Navigation';
import './Navbar.css';

const Navbar = () => {
  const [ordersViewed , setOrderViewed] =useState(0);
  const dispatch = useDispatch();
  const isAuthenticatedUser = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const isAuthenticatedSeller = useSelector(
    (state) => state.authSeller.isAuthenticated
  );
  const user = useSelector((state) => state.auth.user);
  const seller = useSelector((state) => state.authSeller.seller);
  const shop = useSelector((state) => state.shop.shop);
  const show_Menu=useSelector(state=>state.menu.showMenu);
  const sellerOrders = useSelector(state => state.order.sellerOrders);
  const basket = useSelector ((state)=> state.product.basket) ; 
  const filtredSellerOrders = sellerOrders ? sellerOrders.filter (order => order.shipped === true) : null ;
  return (
    <Fragment>
      <nav
        className='navbar'
        role='navigation'
        aria-label='main navigation'
        style={{ backgroundColor: 'grey' }}
      >
        
        <div id="navigationMenu" >
        <Navigation/>
        </div>
        {!show_Menu?
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/c/c7/B-logo-1.png'/>
          </Link>

       
</div>:''}
        <div id='navbarBasicExample' className='navbar-menu'>
          <div id="navMenu" className='navbar-start'>
            <Link to='/' className='navbar-item is-active' style={{ color: 'aqua' }}>
              Home
            </Link>
            {isAuthenticatedSeller && !user ? (
              <>
              <Link
                to='/dashboard'
                className='navbar-item'
                style={{ color: 'aqua' }}
                onClick={() => {
                  dispatch(getShopByID(seller._id));
                  
                  dispatch(getProductsBySeller(seller._id));
                }}
              >
                Dashboard
              </Link>

<Link
to='/seller-orders'
className='navbar-item'
style={{ color: 'aqua' }}
onClick={() => {
  
  dispatch(getSellerOrders());
  
  setOrderViewed(sellerOrders.length);
  
  }}
>
{' '}
              Orders{' '}   
  <span class="badge badge-danger badge-pill">{sellerOrders.length===filtredSellerOrders.length ? '' :sellerOrders.length-filtredSellerOrders}</span>

</Link>

</>









              
            ) : (
                ''
              )}
            {user && isAuthenticatedUser ? (
              <Link
                to='/user-orders'
                className='navbar-item'
                style={{ color: 'aqua' }}
                onClick={() => dispatch(getMyOrders())}
              >
                {' '}
                My Orders{' '}
              </Link>
            ) : !seller && !isAuthenticatedSeller ? (
              <Link
                to='/registerSeller'
                className='navbar-item'
                style={{ color: 'aqua' }}
              >
                Become a seller
              </Link>
            ) : (
                  ''
                )}

            <Link
              to='/allShops'
              className='navbar-item'
              style={{ color: 'aqua' }}
              onClick={() => dispatch(getAllShops())}
            >
              Shops
            </Link>

          </div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <div className='buttons'>
                {user && isAuthenticatedUser ? (
                  <Link
                    to='/'
                    className='button is-danger'
                    style={{ marginBottom: '15px' }}
                    onClick={() => {
                      dispatch(logoutUser());

                      dispatch(clearBasket());
                    }}
                  >
                    <strong>Logout</strong>
                  </Link>
                ) : !seller && !isAuthenticatedSeller ? (
                  <>
                    <Link
                      to='/register'
                      className='button is-primary'
                      style={{ marginBottom: '15px' }}
                    >
                      <strong>Sign up</strong>
                    </Link>
                    <Link
                      to='/login'
                      className='button is-light'
                      style={{ marginBottom: '15px' }}
                    >
                      Log in
                    </Link>
                  </>
                ) : (
                      ''
                    )}
                {seller && isAuthenticatedSeller ? (
                  <>
                    <Link
                      to='/'
                      className='button is-danger'
                      onClick={() => dispatch(logoutSeller())}
                      style={{ marginBottom: '15px' }}
                    >
                      <strong>Logout</strong>
                    </Link>
                    {seller ? (
                      <Link
                        to='/create-product'
                        className='button is-success'
                        style={{ marginBottom: '15px' }}
                      >
                        <strong>Add a product</strong>
                      </Link>
                    ) : (
                        ''
                      )}
                  </>
                ) : !user && !isAuthenticatedUser ? (
                  <Link
                    to='/loginSeller'
                    className='button is-primary'
                    style={{ marginBottom: '15px' }}
                  >
                    <strong>Login as Seller</strong>
                  </Link>
                ) : (
                      ''
                    )}{' '}
                {!seller ? (
                  <Link
                    to='/basket'
                    class='btn btn-warning'
                    style={{ marginBottom: '20px'}}
                  >
                    <i className='fas fa-shopping-basket'></i>
                    <span class="badge badge-danger badge-pill">{basket.length}</span>
                  </Link>
                ) : (
                    ''
                  )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
    </Fragment>
  );
};

export default Navbar;
