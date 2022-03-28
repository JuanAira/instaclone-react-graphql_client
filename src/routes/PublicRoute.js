import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

export function PublicRoute({ children }) {
  const { auth } = useAuth();

  return auth
    ? <Navigate to="/" />
    : children;
}

PublicRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
