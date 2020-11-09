import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getCurrentShop } from '../../redux/actions/shopActions';
import Spinner from '../layouts/Spinner';
import DashboardActions from './DashboardActions';
import ShopCard from './ShopCard';
import ProductCard from '../products/ProductCard';
import {
  getMyProducts,
  deleteProduct,
  getProductByProductId,
} from '../../redux/actions/productActions';

const Dashboard = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCurrentShop());
    dispatch(getMyProducts());
  }, []);

 


  const seller = useSelector((state) => state.authSeller.seller);
  const shop = useSelector((state) => state.shop.shop);
  const loading = useSelector((state) => state.shop.loading);
  const sellerProducts = useSelector((state) => state.product.sellerProducts);

  const currentProducts = sellerProducts.slice(0,12);

  return (
    <Fragment>
      {shop !== null  && shop.seller._id === seller._id ? (
        <Fragment>
          <div style={{marginBottom:'10px'}}>
          <DashboardActions />
          </div>
          <ShopCard />
          <br />
          <br />

          <h2 className='large text-primary'>Products</h2>
          <br />
          <br />
          <div className='sellerProducts' style={{ display: 'flex' , flexWrap:'wrap' }}>
            {currentProducts.map((product) => (
              <>
                <div
                  className='productCard_remove'
                  style={{ display: 'flex', flexDirection: 'column' , marginTop:'10px' , marginRight: '5px'}}
                >
                  <ProductCard product={product} />

                  <button
                    type='button'
                    class='btn btn-danger'
                    onClick={() => dispatch(deleteProduct(product._id))}
                  >
                    Delete Product
                  </button>
                </div>
              </>
            ))}
          </div>
        </Fragment>
      ) : ( 
        <Fragment>
         <Spinner/>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
