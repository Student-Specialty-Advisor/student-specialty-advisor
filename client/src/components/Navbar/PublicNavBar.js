import React from "react";
import {
  Nav,
  NavLink,
  NavLogo,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

function PublicNavbar(props) {
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
          <NavLink to="/about">About</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtn>
            <NavBtnLink to="/login">Log In</NavBtnLink>
          </NavBtn>
          <NavBtn>
            <NavBtnLink to="/signup">Sign Up</NavBtnLink>
          </NavBtn>
        </NavBtn>
      </Nav>
    </>
  );
}

export default PublicNavbar;
