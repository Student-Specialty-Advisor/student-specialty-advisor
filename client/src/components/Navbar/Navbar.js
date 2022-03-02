import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavBar";
import logo from "../../assets/art/logo/logo_white_circle_only.png";

function Navbar() {
  let history = useHistory();
  const isLoggedIn = AuthService.isLoggedIn();
  return (
    <>
      {isLoggedIn ? (
        <PrivateNavbar history={history} logo={logo} />
      ) : (
        <PublicNavbar logo={logo} />
      )}
    </>
  );
}

export default Navbar;
