import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteShop } from '../../redux/actions/shopActions';

const DashboardActions = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className='dash-buttons'>
      <Link to='/edit-shop' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit shop
      </Link>
      <button
        className='btn btn-light'
        onClick={() => dispatch(deleteShop(history))}
      >
        <i className='fas fa-user-circle text-primary'></i> Delete shop
      </button>
    </div>
  );
};

export default DashboardActions;
