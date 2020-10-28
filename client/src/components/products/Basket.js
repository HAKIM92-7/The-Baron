import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteFromBasket } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alertActions';
import { passAnOrder } from '../../redux/actions/orderActions';

const Basket = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.product.basket);
  const user = useSelector((state) => state.auth.user);
  var totalPrice = 0;

  basket.map((product) => {
    totalPrice += product.total_price;
  });

  return (
    <Fragment>
      <h2 className='large text-primary'> Panier </h2>
      {basket.length > 0 ? (
        <>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Image</th>
                <th scope='col'>Product</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Total price</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {basket.map((el, index) => {
                return (
                  <tr index={index}>
                    <td>
                      <img
                        src={el.product.images.image1}
                        style={{ height: '70px', width: '70px' }}
                        alt='image non loaded'
                      />{' '}
                    </td>
                    <td>{el.product.title}</td>
                    <td>{el.quantity}</td>
                    <td>{el.total_price} DT</td>
                    <td>
                      <button
                        className='btn btn-danger'
                        onClick={() => dispatch(deleteFromBasket(index))}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td>Total </td>
                <td>{totalPrice} DT</td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <Link
            to={user !== null ? '/order-infos' : '/register-to-order'}
            class='btn btn-warning'
          >
            Passer La commande{' '}
          </Link>
        </>
      ) : (
        dispatch(setAlert('Pas de produits dans le panier', 'warning'))
      )}
    </Fragment>
  );
};

export default Basket;
