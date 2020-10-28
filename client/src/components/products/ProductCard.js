import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  getProductByProductId,
  getProductsBySeller,
} from '../../redux/actions/productActions';
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Fragment>
      <div className='card' style={{ width: '18rem' }}>
        <Link
          to='/product-profile'
          onClick={() => {
            dispatch(getProductByProductId(product._id));
            dispatch(getProductsBySeller(product.seller._id));
          }}
        >
          {' '}
          <img
            className='card-img-top'
            src={product.images.image1}
            alt='Product image non loaded'
            style={{ height: '200px', width: '300px' }}
          />
        </Link>
        <div className='card-body'>
          <h5 className='card-title' style={{ textAlign: 'center' }}>
            {product.title}
          </h5>
          <br />
          <br />
          <h4>
            Price <span class='badge badge-secondary'>{product.price} DT</span>
          </h4>
        </div>
        <Link
          to='/product-profile'
          className='button is-info'
          onClick={() => {
            dispatch(getProductByProductId(product._id));
          }}
        >
          More Details
        </Link>
      </div>
    </Fragment>
  );
};

export default ProductCard;
