import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Moment from 'react-moment';
import { getShopByID } from '../../redux/actions/shopActions';
import { getProductsBySeller } from '../../redux/actions/productActions';

const ShopItem = ({ shop }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div  id="shopitem" class='card' style={{width:"400px"}}>
        <div class='card-content'>
          <div class='media'>
            <div class='media-left'>
              <figure class='image is-48x48'>
                <img src={shop.logo} alt='image non loaded' />
              </figure>
            </div>
            <div class='media-content'>
              <p class='title is-4'>{shop.nameofshop}</p>
              <p class='subtitle is-6'>{shop.emailofbusiness}</p>
            </div>
          </div>

          <div class='content'>
            {shop.description} <br />
            <a>@{shop.fieldofbusiness}</a>
            <br />
            <p>
              {' '}
              Created at{' '}
              <Moment format='YYYY/MM/DD'>{shop.creation_date}</Moment>
            </p>
            <Link
              to='/shopToPublic'
              class='button is-info'
              onClick={() => {
                dispatch(getShopByID(shop.seller._id));
                dispatch(getProductsBySeller(shop.seller._id));
              }}
            >
              More Details
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopItem;
