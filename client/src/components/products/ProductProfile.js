import React, { Fragment, useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import ProductCard from './ProductCard';
import './ProductProfile.css';
import {
  clearProduct,
  getProductsBySeller,
  addToBasket,

} from '../../redux/actions/productActions';
import { getShopByID } from '../../redux/actions/shopActions';

const ProductProfile = () => {
  const [quantityToOrder, setQuantity] = useState(1);


  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const seller = useSelector((state) => state.authSeller.seller);
  const loading = useSelector((state)=>state.product.loading)
const [image , setImage] =useState ('');
  return !product ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        className='productdetails'
        style={{ display: 'flex', marginBottom: '20px' }}
      >
        <img
          src={ image==='' || (image!==product.images.image2 && image!==product.images.image3) ?product.images.image1:image}
          alt='image non loaded'
          
         
        />
       
        <div className='card'>
          <div className='card-header'>{product.title}</div>
          <div className='card-body'>
            <h4 className='card-title'>
              {' '}
              by{' '}
              <Link
                to='/shopToPublic'
                onClick={() => {
                  dispatch(getShopByID(product.seller));
                  dispatch(getProductsBySeller(product.seller));
                }}
              >
                {product.shop.nameofshop}
              </Link>
            </h4>
            <h5 className='card-title'>{product.technicalsheet}</h5>
            <p className='card-text'>{product.description}</p>
            <br />
            <h5>
              Quantity{' '}
              <span className='badge badge-secondary'>{product.quantity}</span>
            </h5>
            <br />
            {!seller ? (
              <div className='buttons'>
                <button
                  className='plus btn btn-success'
                  onClick={() => {
                    if (quantityToOrder < product.quantity)
                      setQuantity(quantityToOrder + 1);
                  }}
                >
                  +
                </button>{' '}
                <input
                  type='text'
                  id='inp2'
                  className='inp'
                  value={quantityToOrder}
                 
                />
                <button
                  className='moins btn btn-danger'
                  onClick={() => {
                    if (quantityToOrder > 1) setQuantity(quantityToOrder - 1);
                  }}
                >
                  -
                </button>
              </div>
            ) : (
              ''
            )}
            <br /> <br />
            <h4>
              Price{' '}
              <span className='badge badge-secondary'>{product.price} DT</span>
            </h4>
            <br /> <br /> <i className='fas fa-table'></i> created at :
            <Moment format='YYYY/MM/DD'>{`${product.register_date}`}</Moment>{' '}
            <br />
            <br />
            <br />
            {!seller ? (
              <button
                type='button'
                className='btn btn-primary'
                onClick={() =>
                  dispatch(
                    addToBasket(
                      product,
                      quantityToOrder,
                      quantityToOrder * product.price
                    )
                  )
                }
              >
                Add to basket
              </button>
            ) : seller.id === product.seller || seller._id === product.seller ? (
              <Link to='/update-product' className='btn btn-warning'>
                Edit Product
              </Link>
            ) : (
              ''
            )}
            <br />
            <br />
            <br />
            <Link
              to='/'
              onClick={() => {
                dispatch(clearProduct());
              }}
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
      <div className="autresimages" style={{display: 'flex'}}>
      <img src={product.images.image1}  onClick={() => setImage(product.images.image1)}/>
    {product.images.image2?
  <img src={product.images.image2}  onClick={() => setImage(product.images.image2)}/>:null}


{product.images.image3?
  <img src={product.images.image3}  onClick={() => setImage(product.images.image3)}/>:null}

</div>
      <h3 className='large text-primary'> Autres produits de la boutique </h3>
      <div className='autresproduits'>
        {sellerProducts.map((el) =>
          el._id !== product._id ? (
            <div className='productCard'>
              <ProductCard product={el} />
            </div>
          ) : (
            ''
          )
        )}
      </div>
    </Fragment>
  );
};

export default ProductProfile;
