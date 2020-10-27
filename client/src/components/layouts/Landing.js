import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
import { getAllProducts } from '../../redux/actions/productActions';
import ProductCard from '../products/ProductCard';
import './Landing.css';
import Carousel from './Carousel';

const Landing = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return loading && products.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <div id='carousel'>
        <Carousel />
      </div>
      <div id='listofproducts'>
        {products.map((product, index) => (
          <div index={index}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Landing;
