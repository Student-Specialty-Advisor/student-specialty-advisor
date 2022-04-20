import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavBar";
import logo from "../../assets/art/logo/logo_white_circle_only.png";
import useMediaQuery from "@mui/material/useMediaQuery";

function Navbar() {
  let history = useHistory();
  const isLoggedIn = AuthService.isLoggedIn();
  const isMobile = useMediaQuery("(max-width:1080px)");
  return (
    <>
      {isLoggedIn ? (
        <PrivateNavbar isMobile={isMobile} history={history} logo={logo} />
      ) : (
        <PublicNavbar isMobile={isMobile} history={history} logo={logo} />
      )}
    </>
  );
}

export default Navbar;
