import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { createShop, getCurrentShop } from '../../redux/actions/shopActions';
import {
  getProductByProductId,
  updateProduct,
} from '../../redux/actions/productActions';
import Spinner from '../layouts/Spinner';

const UpdateProduct = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) => state.product.product);
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    quantity: 0,
    technicalsheet: '',
    description: '',
    category: '',
    image1: '',
    image2: '',
    image3: '',
  });

  useEffect(() => {
    setFormData({
      title: loading || !product.title ? '' : product.title,
      price: loading || !product.price ? '' : product.price,
      quantity: loading || !product.quantity ? '' : product.quantity,
      technicalsheet:
        loading || !product.technicalsheet ? '' : product.technicalsheet,
      description: loading || !product.description ? '' : product.description,
      category: loading || !product.category ? '' : product.category,
      image1: loading || !product.images.image1 ? '' : product.images.image1,
      image2: loading || !product.images.image2 ? '' : product.images.image2,
      image3: loading || !product.images.image3 ? '' : product.images.image3,
    });
  }, []);

  const loading = useSelector((state) => state.product.loading);

  const {
    title,
    price,
    quantity,
    technicalsheet,
    description,
    category,
    image1,
    image2,
    image3,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product._id, formData, history));
  };
  return (
    <Fragment>
      {!product ? (
        <Spinner />
      ) : (
        <>
          <h2 className='is-primary'> Update product</h2>
          <form onSubmit={onSubmit}>
            <div className='field'>
              <label className='label'>Title of Product</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='Title of Product'
                  name='title'
                  value={title}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Price (DT) </label>
              <div className='control has-icons-left '>
                <input
                  className='input'
                  type='number'
                  placeholder='Price of your product'
                  name='price'
                  value={price}
                  onChange={onChange}
                />
                <span className='icon is-small is-left'>
                  <i class='fas fa-tag'></i>
                </span>
              </div>
            </div>

            <div className='field'>
              <label className='label'>Quantity</label>
              <div className='control has-icons-left '>
                <input
                  className='input'
                  type='number'
                  placeholder='Quantity'
                  name='quantity'
                  value={quantity}
                  onChange={onChange}
                />
                <span className='icon is-small is-left'>
                  <i class='fas fa-layer-group'></i>
                </span>
              </div>
            </div>

            <div className='field'>
              <label className='label'>Technical sheet</label>
              <div className='control'>
                <textarea
                  className='textarea'
                  placeholder='Technical sheet'
                  name='technicalsheet'
                  value={technicalsheet}
                  onChange={onChange}
                ></textarea>
              </div>
            </div>

            <div className='field'>
              <label className='label'>Description</label>
              <div className='control'>
                <textarea
                  className='textarea'
                  placeholder='Description'
                  name='description'
                  value={description}
                  onChange={onChange}
                ></textarea>
              </div>
            </div>

            <div className='field'>
              <label className='label'>Category</label>
              <div className='control'>
                <div className='select'>
                  <select name='category' value={category} onChange={onChange}>
                    <option value='Afganistan'>Afghanistan</option>
                    <option value='Albania'>Albania</option>
                    <option value='Algeria'>Algeria</option>
                    <option value='American Samoa'>American Samoa</option>
                    <option value='Andorra'>Andorra</option>
                    <option value='Angola'>Angola</option>
                    <option value='Anguilla'>Anguilla</option>
                    <option value='Antigua & Barbuda'>Antigua & Barbuda</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='field'>
              <label className='label'>Image 1</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='url image 1 '
                  name='image1'
                  value={image1}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>image2 </label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='url image 2 '
                  name='image2'
                  value={image2}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Image 3</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='url image 3'
                  name='image3'
                  value={image3}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className='field is-grouped'>
              <div className='control'>
                <button className='button is-link'>Submit</button>
              </div>
              <div className='control'>
                <button className='button is-link is-light'>Cancel</button>
              </div>
            </div>
          </form>
        </>
      )}
    </Fragment>
  );
};

export default UpdateProduct;
