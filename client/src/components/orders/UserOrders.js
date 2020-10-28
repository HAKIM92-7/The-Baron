import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromBasket } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alertActions';
import Moment from 'react-moment';
import { getMyOrders } from '../../redux/actions/orderActions';

const UserOrders = () => {
  useEffect(() => {
    dispatch(getMyOrders());
  }, []);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.userOrders);
  const user = useSelector((state) => state.auth.user);

  return (
    <Fragment>
      <h2 className='large text-primary' style={{ marginBottom: '50px' }}>
        {' '}
        Commandes
      </h2>
      {orders ? (
        <>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Reference</th>
                <th scope='col'>Date</th>
                <th scope='col'>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((el, index) => {
                console.log(el.command_date);
                return (
                  <tr index={index}>
                    <td>{el._id}</td>
                    <td>
                      <p>
                        <Moment format='YYYY/MM/DD'>
                          {`${el.command_date}`}
                        </Moment>
                      </p>
                    </td>
                    <td>{el.total} DT </td>
                    <td>
                      {' '}
                      <button className='btn btn-info'>More details</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        dispatch(setAlert('Pas de commandes encore', 'warning'))
      )}
    </Fragment>
  );
};

export default UserOrders;
