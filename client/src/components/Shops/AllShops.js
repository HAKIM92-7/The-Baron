import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllShops } from '../../redux/actions/shopActions';
import ShopItem from './ShopItem';
import Spinner from '../layouts/Spinner';

const AllShops = () => {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shop.shops);

  const loading = useSelector((state) => state.shop.loading);
  return (
    <Fragment>
      <h1 class='title is-1' style={{ color: 'blue', textAlign: 'center' }}>
        All Shops
      </h1>{' '}
      <br />
      {shops.map((shop) => (
        <Fragment>
          <ShopItem shop={shop} />
        </Fragment>
      ))}
    </Fragment>
  );
};

export default AllShops;
