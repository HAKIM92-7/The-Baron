import React,{Fragment,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { logoutUser } from '../../redux/actions/authActions';
import { logoutSeller } from '../../redux/actions/authSellerActions';
import {showMenu} from '../../redux/actions/menuActions';
import { getMyOrders } from '../../redux/actions/orderActions';
import { getProductsBySeller } from '../../redux/actions/productActions';
import { getAllShops, getShopByID } from '../../redux/actions/shopActions';
import './Navigation.css';
const Navigation = () => {

const dispatch=useDispatch();
const show_Menu=useSelector(state=>state.menu.showMenu);
const isAuthenticatedUser = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const isAuthenticatedSeller = useSelector(
    (state) => state.authSeller.isAuthenticated
  );
  const user = useSelector((state) => state.auth.user);
  const seller = useSelector((state) => state.authSeller.seller);
    return (
        <Fragment>
            <nav onClick={()=> dispatch(showMenu())}>
            <i class="fas fa-bars"></i>
            </nav>

        {show_Menu ? <div className="navMenu" style={{height:'500px'}}> 

        <ul>
        {user?
        <>
         <li><Link to='/basket' className="navig_link" onClick={()=>{
            dispatch(showMenu());
          
            
            }}>Your Basket</Link></li>
        <li><Link to='/' className="navig_link" onClick={()=>dispatch(showMenu())}>Home</Link></li>
        <li><Link to='/' className='navig_link' onClick={()=>{
            dispatch(logoutUser());
            dispatch(showMenu());
        }}>logout</Link></li>
        <li><Link to='/allShops' className='navig_link'  onClick={()=>{
            
            dispatch(showMenu());
            dispatch(getAllShops());
            
            
            
            }}>Shops</Link></li>
        <li><Link to='/user-orders' className='navig_link' onClick={()=>{
            dispatch(showMenu());
            dispatch(getMyOrders());
            
            }}>Orders</Link></li>
        </>:seller ?  <>
        <li><Link to='/' className='navig_link' onClick={()=>dispatch(showMenu())}>Home</Link></li>
        <li><Link to='/' className='navig_link' onClick={()=>{
            dispatch(logoutSeller());
            dispatch(showMenu());
        }}>logout</Link></li>
        <li><Link to='/allShops' className='navig_link' onClick={()=>{
            
            dispatch(showMenu());
            dispatch(getAllShops());
            
            
            
            }}>Shops</Link></li>


        <li><Link to='/dashboard' className='navig_link' onClick={()=>{
            dispatch(showMenu());
            dispatch(getShopByID(seller._id));
            dispatch(getProductsBySeller(seller._id));
            
            }}>Dashboard </Link></li>

       <li><Link to='/create-product' className='navig_link' onClick={()=>{
            
            dispatch(showMenu());
            dispatch(getAllShops());
            
            
            
            }}>Create Product</Link></li>












        </>:<>
        <li><Link to='/basket' className='navig_link' onClick={()=>{
            dispatch(showMenu());
          
            
            }}>Your Basket</Link></li>
        <li><Link to='/' className='navig_link' onClick={()=>dispatch(showMenu())}>Home</Link></li>
        
        <li><Link to='/allShops' className='navig_link'  onClick={()=>{
            
            dispatch(showMenu());
            dispatch(getAllShops());
            
            
            
            }}>Shops</Link></li>
        <li><Link to='/registerSeller' className='navig_link' onClick={()=>{
            dispatch(showMenu());
            
            }}>Become a seller</Link></li>

<li><Link to='/loginSeller' className='navig_link' onClick={()=>{
            dispatch(showMenu());
            
            }}>Login as Seller</Link></li>

<li><Link to='/login' className='navig_link' onClick={()=>{
            dispatch(showMenu());
            
            }}>Login</Link></li>

<li><Link to='/register' className='navig_link' onClick={()=>{
            dispatch(showMenu());
            
            }}>Register</Link></li>
        </>} 
        </ul>


        </div> : null}





        </Fragment>
    )
}

export default Navigation
