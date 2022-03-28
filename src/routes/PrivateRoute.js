import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

export function PrivateRoute({ children }) {
  const { auth } = useAuth();

  return auth
    ? children
    : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
