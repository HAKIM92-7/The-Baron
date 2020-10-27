import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-shop' class='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit shop
      </Link>
    </div>
  );
};

export default DashboardActions;
