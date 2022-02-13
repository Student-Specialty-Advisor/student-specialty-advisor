import React from "react";
import SmuLogoTree from "../../assets/Images/SmuLogoTree.png";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./PublicNavBarElements";

function PublicNavbar() {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/">
            <img src={SmuLogoTree} alt="logo is still loading.."></img>
          </NavLink>
          <NavLink to="/about">About</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
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
