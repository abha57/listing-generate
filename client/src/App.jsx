import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
// import auth0Client from "auth";
import ProductCategory from "containers/productCategory";
import Callback from "components/callback";
import SecuredRoute from "components/securedRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSession: true
    };
  }
  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({checkSession:false});
      return;
    }
    // try {
    //   await auth0Client.silentAuth();
    //   this.forceUpdate();
    // } catch (err) {
    //   if (err.error !== "login_required") console.log(err.error);
    // }
    this.setState({
      checkSession: false
    });
  }
  render() {
    const { checkSession } = this.state;
    return (
      <div>
        {/* {auth0Client.isAuthenticated() && (
          <div>
            Hii
            <button onClick={auth0Client.signOut}> Logout </button>
            <nav>
              <Link to="/">Go to listing</Link>
            </nav>
          </div>
        )} */}
        <SecuredRoute
          path="/"
          exact
          component={ProductCategory}
          checkSession={checkSession}
        />
        <Route path="/callback" component={Callback} />
      </div>
    );
  }
}

export default withRouter(App);
