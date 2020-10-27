import React, { Fragment, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { passAnOrder } from '../../redux/actions/orderActions';
import { clearBasket } from '../../redux/actions/productActions';

const OrderInfos = () => {
  const basket = useSelector((state) => state.product.basket);
  const [formData, setFormData] = useState({
    adress_of_delivery: '',
    postal_code: '',
    telephone: '',
  });

  const { adress_of_delivery, postal_code, telephone } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(passAnOrder(basket, adress_of_delivery, postal_code, telephone));
  };

  const dispatch = useDispatch();

  return (
    <Fragment>
      <h1 className='large text-primary'>Finaliser la commande </h1>
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <div class='field'>
          <p class='control has-icons-left '>
            <input
              class='input'
              type='text'
              placeholder='adress of delivery'
              name='adress_of_delivery'
              value={adress_of_delivery}
              onChange={onChange}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-address-card'></i>
            </span>
          </p>
        </div>

        <div class='field'>
          <p class='control has-icons-left '>
            <input
              class='input'
              type='number'
              placeholder='Postal Code'
              name='postal_code'
              value={postal_code}
              onChange={onChange}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-mail-bulk'></i>
            </span>
          </p>
        </div>

        <div class='field'>
          <p class='control has-icons-left '>
            <input
              class='input'
              type='text'
              placeholder='Telephone'
              name='telephone'
              value={telephone}
              onChange={onChange}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-phone-square-alt'></i>
            </span>
          </p>
        </div>

        <div class='field'>
          <p class='control'>
            <button class='button is-success'>Passer la commande </button>
          </p>
        </div>
      </form>
    </Fragment>
  );
};

export default OrderInfos;
