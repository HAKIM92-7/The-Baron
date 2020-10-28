import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSeller } from '../../redux/actions/authSellerActions';
import { getCurrentShop, getShopByID } from '../../redux/actions/shopActions';
import { loadUser } from '../../redux/actions/authActions';

const LoginSeller = () => {
  const [loginInfos, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginInfos;

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authSeller.isAuthenticated
  );

  const onChange = (e) => {
    setLoginInfo({ ...loginInfos, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginSeller({ email, password }));
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <br />
      <p className='lead'>
        <i className='fas fa-user'></i> Login to your Seller account
      </p>
      <br />

      <form onSubmit={onSubmit}>
        <div class='field'>
          <p class='control has-icons-left '>
            <input
              class='input'
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChange}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-envelope'></i>
            </span>
          </p>
        </div>
        <div class='field'>
          <p class='control has-icons-left'>
            <input
              class='input'
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-lock'></i>
            </span>
          </p>
        </div>
        <div class='field'>
          <p class='control'>
            <button class='button is-success'>Login</button>
          </p>
        </div>
      </form>
      <p className='my-1'>
        You haven't a seller account yet?{' '}
        <Link to='/registerSeller'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default LoginSeller;
