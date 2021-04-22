import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return <Route {...props} render={()=>{
    if(localStorage.getItem('token') === null) {
      return <Redirect to='/login' />
    }
    return <Component />
  }} />
}

export default ProtectedRoute;
