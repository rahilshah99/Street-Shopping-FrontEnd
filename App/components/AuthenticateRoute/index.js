import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import Header from '../Header';

const AuthenticateRoute = ({ component: Component, ...rest }) => {
  const authUser = sessionStorage.getItem('userToken');
  const isAuthenticated = true;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <div>
            <Header {...props} />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

AuthenticateRoute.propTypes = {
  component: PropTypes.func,
};
export default AuthenticateRoute;
