import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from './userAuth';

const ProtectedRoute = ({ component }: any) => {
  const isAuthenticated = useAuth().user !== null;
  const ProtectedComponent = component;
  if (isAuthenticated) {
    return <ProtectedComponent />;
  }
  return <Redirect to={{ pathname: '/login' }} />;
};

export default ProtectedRoute;
