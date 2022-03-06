import alertify from "alertifyjs";
import React from "react";
import { withRouter } from "react-router-dom";
import AuthService from "../../services/AuthService";

function AuthVerify(props) {
  const parseToken = (token) => {
    try {
      return JSON.parse(window.atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  };

  const verify = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      const decodedToken = parseToken(user.accessToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        alertify.alert(
          "Your 24H session expired. Please login again to continue!",
          function () {
            if (window.location.pathname === "/") {
              AuthService.logout();
              window.location.href = "/login";
            } else {
              AuthService.logout();
              window.location.reload();
            }
          }
        );
      }
    }
  };

  const listen = () => {
    props.history.listen(() => {
      verify();
    });
  };

  React.useEffect(verify);
  React.useEffect(listen);

  return <></>;
}

export default withRouter(AuthVerify);
