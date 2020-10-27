import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

const ShopCard = () => {
  const shop = useSelector((state) => state.shop.shop);
  return (
    <Fragment>
      <div class='tile is-ancestor'>
        <div class='tile is-vertical is-8'>
          <div class='tile'>
            <div class='tile is-parent is-vertical'>
              <article class='tile is-child notification is-primary'>
                <p class='title'>Address</p>
                <p class='subtitle'>
                  {shop.adress},{shop.country}
                </p>
                <p class='title'>Telephone</p>
                <p class='subtitle'>{shop.telephone}</p>
              </article>
              <article class='tile is-child notification is-warning'>
                <p class='title'>Field of business</p>
                <p class='subtitle'>{shop.fieldofbusiness}</p>
              </article>
            </div>
            <div class='tile is-parent'>
              <article class='tile is-child notification is-info'>
                <p class='title'>{shop.nameofshop}</p>

                <figure class='image is-4by3'>
                  <img src={shop.logo} alt='non loaded' />
                </figure>
              </article>
            </div>
          </div>
          <div class='tile is-parent'>
            <article class='tile is-child notification is-danger'>
              <p class='title'>Crated at </p>
              <p class='subtitle'>
                <Moment format='YYYY/MM/DD  h:mm:ss'>
                  {shop.creation_date}
                </Moment>
              </p>
              <div class='content'></div>
            </article>
          </div>
        </div>
        <div class='tile is-parent'>
          <article class='tile is-child notification is-success'>
            <div class='content'>
              <p class='title'>Who are we ?</p>
              <p class='subtitle'>{shop.description}</p>
              <div class='content'></div>
            </div>
          </article>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopCard;
