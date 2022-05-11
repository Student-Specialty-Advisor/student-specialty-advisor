import alertify from "alertifyjs";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AuthService from "../../services/AuthService";

const AdminRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = AuthService.isLoggedIn();
  const isAdmin = AuthService.isAdmin();

  const UnAuthorized = (props) => {
    React.useEffect(() => {
      alertify.error("You are not authorized to access this page!");
    }, []);
    return <Redirect to={{ pathname: "/" }} />;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          isAdmin ? (
            <Component {...props} />
          ) : (
            <UnAuthorized />
          )
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default AdminRoute;
