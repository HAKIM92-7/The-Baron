import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

const LoginToOrder = () => {
  const [loginInfos, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginInfos;

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onChange = (e) => {
    setLoginInfo({ ...loginInfos, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Redirect to='/order-infos' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <br />
      <p className='lead'>
        <i className='fas fa-user'></i> Login to your account
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
        You haven't an account yet? <Link to='/register-to-order'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default LoginToOrder;
