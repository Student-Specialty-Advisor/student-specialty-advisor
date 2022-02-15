import React from "react";
import Authservice from "../../services/AuthService";
import {
  Nav,
  NavLink,
  NavLogo,
  Bars,
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
  return (
    <>
      <Nav>
        <Bars />
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
          <NavLink to="/about">About</NavLink>
          <NavLink to="/videos">Videos</NavLink>
          <NavLink to="/curricilum">Curricilum</NavLink>
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
