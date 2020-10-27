import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const seller = useSelector((state) => state.authSeller.seller);
  const isAuthenticatedSeller = useSelector(
    (state) => state.authSeller.isAuthenticated
  );
  const user = useSelector((state) => state.auth.user);
  const isAuthenticatedUser = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return seller ? (
    <Route
      {...rest}
      render={(props) =>
        !seller && !isAuthenticatedSeller ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  ) : (
    <Route
      {...rest}
      render={(props) =>
        !user && !isAuthenticatedUser ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
