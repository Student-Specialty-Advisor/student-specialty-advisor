import React from "react";
import { useHistory } from "react-router-dom";
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
        AuthService.logout();
        history.push({ tokenExpired: "yes" });
        props.setIsLoggedIn(AuthService.isLoggedIn());
      }
    }
  };

  const [history] = React.useState(useHistory());

  const listen = () => {
    history.listen(() => {
      verify();
    });
  };

  React.useEffect(verify);
  React.useEffect(listen);

  return <></>;
}

export default AuthVerify;
