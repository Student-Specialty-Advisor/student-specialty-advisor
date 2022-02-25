import React from "react";
import Authservice from "../../services/AuthService";
import {
  Nav,
  NavLink,
  NavLogo,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

function PrivateNavbar(props) {
  const logout = () => {
    Authservice.logout();
    props.history.push("/login");
    window.location.reload();
  };
  const isAdmin = Authservice.isAdmin();
  console.log(Authservice.getCurrentUser());
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLogo to="/">
            <div className="navbar-logo-container">
              <img
                className="navbar-logo"
                src={props.logo}
                alt="logo is still loading.."
              ></img>
            </div>
          </NavLogo>
          <NavLink to="/quiz">Quiz</NavLink>
          <NavLink to="/programs">Programs</NavLink>
          <NavLink to="/videos">Videos</NavLink>
          <NavLink to="/meeting">Meeting</NavLink>
          <NavLink to="/forum">Forum</NavLink>
          {isAdmin ? <NavLink to="/statistics">Statistics</NavLink> : null }
        </NavMenu>
        <NavBtn>
          <NavBtn>
            <NavBtnLink to="/profile">Profile</NavBtnLink>
          </NavBtn>
          <NavBtn>
            <NavBtnLink to="/" onClick={logout}>
              Log Out
            </NavBtnLink>
          </NavBtn>
        </NavBtn>
      </Nav>
    </>
  );
}

export default PrivateNavbar;
