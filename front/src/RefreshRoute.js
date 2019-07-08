import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const RefreshRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (user !== '') ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
    }
  />
);

const mapStateToProps = state => ({
  user: state.auth.username
});

export default connect(mapStateToProps)(RefreshRoute);  