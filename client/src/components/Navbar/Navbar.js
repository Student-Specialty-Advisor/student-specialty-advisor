import AuthService from "../../services/AuthService";
import React from "react";
import { useHistory } from "react-router-dom";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavBar";
import logo from "../../assets/art/logo_white.png";
import AuthVerify from "../Auth/AuthVerify";

function Navbar() {
  let history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(AuthService.isLoggedIn());
  return (
    <>
      <AuthVerify setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? (
        <PrivateNavbar history={history} logo={logo} />
      ) : (
        <PublicNavbar logo={logo} />
      )}
    </>
  );
}

export default Navbar;
