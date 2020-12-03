import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getShopByID } from '../../redux/actions/shopActions';
import { getProductByProductId, getProductsBySeller } from '../../redux/actions/productActions';
const Carousel = () => {

  const dispatch = useDispatch();
  return (
    <Fragment>
      <div
        id='carouselExampleIndicators'
        class='carousel slide'
        data-ride='carousel'
      >
        <ol class='carousel-indicators'>
          <li
            data-target='#carouselExampleIndicators'
            data-slide-to='0'
            class='active'
          ></li>
          <li data-target='#carouselExampleIndicators' data-slide-to='1'></li>
          <li data-target='#carouselExampleIndicators' data-slide-to='2'></li>
        </ol>
        <div class='carousel-inner active'>
          <div class='carousel-item active'>
          
          <Link to='/product-profile' onClick={()=> {
            
            dispatch(getProductByProductId('5f9bede9cbc9a9138da70519'));
            dispatch(getProductsBySeller('5f982c66bc15a747c9347fe8'));
           }}>
            
            
            <img
              src='https://cms.intersport.fr/wp-content/uploads/2019/08/bg-img-4_mobile-1.jpg'
              style={{ height: '300px' }}
              class='d-block w-100'
              alt='...'
            /></Link>
          </div> 
          <div class='carousel-item'>
          <Link to='/shopToPublic' onClick={()=> {
            
            dispatch(getShopByID('5f9b24100fa0ce09d7299826'));
            dispatch (getProductsBySeller('5f9b24100fa0ce09d7299826'));

           }}> <img
              src='https://i.ytimg.com/vi/ctbwMTMTVfw/maxresdefault.jpg'
              style={{ height: '300px' }}
              class='d-block w-100'
              alt='...'
            /> </Link>
          </div>
          <div class='carousel-item'>
           <Link to='/shopToPublic' onClick={()=> {
            
            dispatch(getShopByID('5f956b3690984f2e58b12c35'));
            dispatch (getProductsBySeller('5f956b3690984f2e58b12c35'));

           }}> <img
              src='https://cristianlay.com/blog/tn/wp-content/uploads/sites/5/2018/02/como-comprar-CRISTIAN-LAY.jpg'
              style={{ height: '300px' }}
              class='d-block w-100'
              alt='...'
            /></Link>
          </div>
        </div>
        <a
          class='carousel-control-prev'
          href='#carouselExampleIndicators'
          role='button'
          data-slide='prev'
        >
          <span class='carousel-control-prev-icon' aria-hidden='true'></span>
          <span class='sr-only'>Previous</span>
        </a>
        <a
          class='carousel-control-next'
          href='#carouselExampleIndicators'
          role='button'
          data-slide='next'
        >
          <span class='carousel-control-next-icon' aria-hidden='true'></span>
          <span class='sr-only'>Next</span>
        </a>
      </div>
    </Fragment>
  );
};

export default Carousel;
