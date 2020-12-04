import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
import {
  getAllProducts,
  clearProduct,
  clearSellerProducts,
} from '../../redux/actions/productActions';
import ProductCard from '../products/ProductCard';
import './Landing.css';
import Carousel from './Carousel';
import CategoriesFilter from './CategoriesFilter';

import Pagination from './Pagination';
import { setAlert } from '../../redux/actions/alertActions';
import { clearOrder , getSellerOrders } from '../../redux/actions/orderActions';
import CategoriesFilterMobile from './CategoriesFilterMobile';
import ContactUs from './ContactUs';

const Landing = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);
  

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getSellerOrders());
    dispatch(clearProduct());
    dispatch(clearOrder());
    dispatch(clearSellerProducts());
  }, []);

  const [filter, setFilter] = useState('');
  const [category , setCategory]= useState('');
  const [currentPage , setCurrentPage] = useState(1);
  const [productsPerPage , setProductsPerPage] = useState(12);

  

  const filtredList = products.filter((product) => {
    if(filter !== ''){
    return  product.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
   } 
   else if (category!==''){
    return product.category === category;
   }
   else {
     return product ;
}
  });

  const indexOfLastPage = currentPage * productsPerPage ;
  const indexOfFirstPage = indexOfLastPage - productsPerPage ;
  const currentProducts = filtredList.slice(indexOfFirstPage,indexOfLastPage);
 
  const paginate =(pageNumber) =>{

   setCurrentPage(pageNumber)

  }

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

      <div id="categoriesMobile">
<CategoriesFilterMobile  setCategory={setCategory}/>

      </div>

      <div  id="listlength" className="alert alert-primary" role="alert">
{filtredList.length} Products
</div>  
       <div className="filterandproducts">
         
        <div id="categories">
          <CategoriesFilter setCategory={setCategory}/>
          </div>

      <div className='container'>
       
        <div id='listofproducts'>
         
          {currentProducts.map((product, i) => (
            <div index={i} className='productcard'>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>    
      </div>
    <div id="paginations">
   <Pagination elementsPerPage={productsPerPage} totalElements={filtredList.length} paginate={paginate}/>
   </div>   

    </Fragment>
  );
};

export default Landing;
