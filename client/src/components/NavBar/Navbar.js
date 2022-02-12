import React from "react";
import SmuLogoTree from "../../assets/images/SmuLogoTree.png";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

function Navbar() {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/">
            <img src={SmuLogoTree} alt="logo is still loading.."></img>
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/videos">Videos</NavLink>
          <NavLink to="/curricilum">Curricilum</NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-up'>Sign Up</NavBtnLink> */}
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

export default Navbar;
