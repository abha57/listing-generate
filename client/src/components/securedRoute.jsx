import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import auth0Client from 'auth';



 const SecuredRoute = ({ component: Component, path, checkSession, ...props }) => {
    if(checkSession) return (
         <div>
         Validating session......
         </div>
     )
    return auth0Client.isAuthenticated() ? (
        <Route path={path} component={Component} {...props} />
    ) : (
        <div>
            Sorry please login!!!
            <button onClick={auth0Client.signIn}>Log In</button>
        </div>
    )
}

export default withRouter(SecuredRoute);