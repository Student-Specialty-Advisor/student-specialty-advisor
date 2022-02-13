import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavBar";

function Navbar() {
  let history = useHistory();
  const isLoggedIn = AuthService.isLoggedIn();
  return isLoggedIn ? <PrivateNavbar history={history} /> : <PublicNavbar />;
}

export default Navbar;
