import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { createShop, getCurrentShop } from '../../redux/actions/shopActions';
import {
  getProductByProductId,
  updateProduct,
  uploadImages,
} from '../../redux/actions/productActions';
import Spinner from '../layouts/Spinner';
import path from 'path';

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
  const [files , setFiles] =useState ([]);

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
  const onChangeFiles = (e) => {
    setFiles([...files, e.target.files[0]]);
    
    setFormData({...formData , [e.target.name] : `/uploads/products_images/${e.target.files[0].name}` })
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product._id, formData, history));
    files.map((file) =>{
      dispatch(uploadImages(file));}
   )
  
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
                  <option value='None'>None</option>
                <option value='Industrie'>Industrie</option>
                <option value='Autos'>Autos</option>
                <option value='Sport'>Sport</option>
                <option value='Cuisine'>Cuisine</option>
                <option value='Décoration'>Décoration</option>
                <option value='Accessoires'>Accessoires</option>
                <option value='Fourniture scolaire'>Fourniture scolaire</option>
           
                  </select>
                </div>
              </div>
            </div>

            <div className="file has-name">
  <label className="file-label">
  <input
                  className="file-input"
                  type='file'
                  accept="image/png, image/jpeg , image/jpg"
                  name='image1'
                 
                  onChange={onChangeFiles}
                />
    <span className="file-cta">
      <span className="file-icon">
        <i className="fas fa-upload"></i>
      </span>
      <span className="file-label">
        Choose a file…
      </span>
    </span>
    <span className="file-name">
      {path.basename(image1)}
    </span>
  </label>
</div>

<div className="file has-name">
  <label className="file-label">
  <input
                  className="file-input"
                  type='file'
                 
                  name='image2'
                  accept="image/png, image/jpeg , image/jpg"
                  onChange={onChangeFiles}
                />
    <span className="file-cta">
      <span className="file-icon">
        <i className="fas fa-upload"></i>
      </span>
      <span className="file-label">
        Choose a file…
      </span>
    </span>
    <span className="file-name">
 {path.basename(image2)}
    </span>
  </label>
</div>

<div className="file has-name">
  <label className="file-label">
  <input
                  className="file-input"
                  type='file'
                  
                  name='image3'
                  accept="image/png, image/jpeg , image/jpg"
                  onChange={onChangeFiles}
                />
    <span className="file-cta">
      <span className="file-icon">
        <i className="fas fa-upload"></i>
      </span>
      <span className="file-label">
        Choose a file…
      </span>
    </span>
    <span className="file-name">
      {path.basename(image3)}
    </span>
  </label>
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
