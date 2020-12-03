import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromBasket } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alertActions';
import Moment from 'react-moment';
import { getSellerOrders, getOrderByOrderId, getSellerOrderByOrderId } from '../../redux/actions/orderActions';

const SellerOrders = () => {
  useEffect(() => {
    dispatch(getSellerOrders());
  }, []);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.sellerOrders);
  const seller = useSelector((state) => state.authSeller.seller);

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
                <th scope='col'>Shipped</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((el, index) => {
               
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
                    <td>{el.shipped ? <i class="fas fa-check"></i> :<i class="fas fa-spinner"></i>}</td>
                    <td>
                      {' '}
                      <Link to={'/seller-order-details'}  
                      className='btn btn-info'  onClick={()=>dispatch(getSellerOrderByOrderId(el._id))} >More details</Link>
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

export default SellerOrders;
