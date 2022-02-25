import alertify from "alertifyjs";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "../../services/AuthService";

const AdminRoute = ({ component: Component, ...rest }) => {
  const isAdmin = AuthService.isAdmin();
  const UnAuthorized = (props) => {
    React.useEffect( () =>  {alertify.error("You are not Authorized to access this page! ")})
    return (         
        <Redirect
      to={{ pathname: "/", state: { from: props.location } }}
    />)
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <UnAuthorized/>
        )
      }
    />
  );
};

export default AdminRoute;