import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
import {
  getAllProducts,
  clearProduct,
} from '../../redux/actions/productActions';
import ProductCard from '../products/ProductCard';
import './Landing.css';
import Carousel from './Carousel';

const Landing = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(clearProduct());
  }, []);

  const [filter, setFilter] = useState('');

  const filtredList = products.filter((product) => {
    return filter !== ''
      ? product.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      : product;
  });

  return loading && products.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <div id='search'>
        <form
          className='form-inline'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className='form-control mr-sm-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className='btn btn-outline-success my-2 my-sm-0'
            type='submit'
          >
            Search
          </button>
        </form>
      </div>
      <div id='carousel'>
        <Carousel />
      </div>
      <div className='container'>
        <div id='listofproducts'>
          {filtredList.map((product, i) => (
            <div index={i} className='productcard'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
