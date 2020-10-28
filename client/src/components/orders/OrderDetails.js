import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux';
import { getOrderByOrderId } from '../../redux/actions/orderActions';
import Spinner from '../layouts/Spinner';


const OrderDetails = (props) => {

const dispatch = useDispatch();
    const order = useSelector((state)=> state.order.order);
    const loading = useSelector((state)=> state.order.loading);

    var totalPrice = 0;
if (order) {
    order.listofproducts.map((product) => {
      totalPrice += product.total_price;
    });}

    return (

 !order ? <Spinner/>:

        <Fragment>

        
<div className="list-group">
  <a href="#" className="list-group-item list-group-item-action active">
   Informations de livraison
  </a>
  <a href="#" className="list-group-item list-group-item-action">Adresse de livraison :{order.contact_infos.adress_of_delivery}</a>
  <a href="#" className="list-group-item list-group-item-action">Code postal :{order.contact_infos.postal_code}</a>
  <a href="#" className="list-group-item list-group-item-action">Telephone :{order.contact_infos.telephone}</a>
  
</div> <br/><br/> <br/>

<h2 className="large text-primary" style={{marginBottom : '70px' }}>Produits </h2>

<table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Image</th>
                <th scope='col'>Product</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Total price</th>
                
              </tr>
            </thead>
            <tbody>
              {order.listofproducts.map((el, index) => {
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
        <br/> <br/>

        <Link to='/user-orders'  className="btn btn-info ">Go Back</Link>








        </Fragment> 
    )
}

export default OrderDetails
