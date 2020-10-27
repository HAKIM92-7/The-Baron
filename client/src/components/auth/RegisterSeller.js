import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../redux/actions/alertActions';
import { registerSeller } from '../../redux/actions/authSellerActions';
import { Redirect } from 'react-router-dom';

const RegisterSeller = () => {
  const [registerInfos, setRegisterInfo] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    password2: '',
  });

  const { lastname, firstname, email, password, password2 } = registerInfos;

  const onChange = (e) => {
    setRegisterInfo({ ...registerInfos, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("passwords don't match", 'danger', 8000));
    } else {
      dispatch(registerSeller({ lastname, firstname, email, password }));
    }
  };

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authSeller.isAuthenticated
  );

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up Seller</h1>
      <br />
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Seller
      </p>
      <br />
      <form onSubmit={onSubmit}>
        <div class='field'>
          <p class='control has-icons-left '>
            <input
              class='input'
              type='text'
              placeholder='LastName'
              name='lastname'
              value={lastname}
              onChange={onChange}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-user-circle'></i>
            </span>
          </p>
        </div>

        <div class='field'>
          <p class='control has-icons-left '>
            <input
              class='input'
              type='text'
              placeholder='FirstName'
              name='firstname'
              value={firstname}
              onChange={onChange}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-user-circle'></i>
            </span>
          </p>
        </div>

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
          <p class='control has-icons-left has-icons-right'>
            <input
              class='input'
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={password2}
              onChange={onChange}
            />
            <span class='icon is-small is-left'>
              <i class='fas fa-lock'></i>
            </span>
            {password === password2 && password2 !== '' ? (
              <span class='icon is-small is-right' style={{ color: 'green' }}>
                <i class='fas fa-check'></i>
              </span>
            ) : (
              ''
            )}
          </p>
        </div>
        <div class='field'>
          <p class='control'>
            <button class='button is-success'>Register</button>
          </p>
        </div>
      </form>
      <p className='my-1'>
        Already have a seller account? <Link to='/loginSeller'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default RegisterSeller;
