import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import Moment from 'react-moment';
import ProductCard from '../products/ProductCard';
import './ShopToPublic.css';

const ShopToPublic = () => {
  const shop = useSelector((state) => state.shop.shop);
  const sellerProducts = useSelector((state) => state.product.sellerProducts);

  return !shop ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        className='shopdetails'
        style={{ display: 'flex', marginBottom: '20px' }}
      >
        <img
          src={shop.logo}
          alt='image non loaded'
          style={{ height: '600px', width: '400 px', marginRight: '20px' }}
        />
        <div class='card shop_card'>
          <div class='card-header'>{shop.nameofshop}</div>
          <div class='card-body'>
            <h5 class='card-title'>{shop.fieldofbusiness}</h5>
            <p class='card-text'>{shop.description}</p>
            <i class='fas fa-envelope-square'></i> {`  ${shop.emailofbusiness}`}{' '}
            <br />
            <br />
            <i class='fas fa-phone-square-alt'></i>
            {`  ${shop.telephone}`} <br />
            <br />
            <i class='fas fa-map-marker-alt'></i>
            {`  ${shop.adress}, ${shop.country}`} <br />
            <br />
            <i class='fas fa-table'></i> created at :
            <Moment format='YYYY/MM/DD'>{`${shop.creation_date}`}</Moment>
            <br />
            <br />
          </div>
        </div>
      </div>
      <h2 className='large text-primary'>Products</h2>
      <br />
      <br />

      <div className='sellerProducts' style={{ display: 'flex',flexWrap:'wrap' }}>
        {sellerProducts.map((product) => (
          <div className="elementproduct" style={{marginRight:'10px' , marginTop:'10px'}}>
          <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ShopToPublic;
