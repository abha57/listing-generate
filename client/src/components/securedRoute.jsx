import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import auth0Client from 'auth';



 const SecuredRoute = ({ component: Component, path, checkSession, ...props }) => {
    if(checkSession) return (
         <div>
         Validating session......
         </div>
     )
    return <Route path={path} component={Component} {...props} />
}

export default withRouter(SecuredRoute);