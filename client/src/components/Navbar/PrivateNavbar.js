import React from "react";
import SmuLogoTree from "../../assets/Images/SmuLogoTree.png";
import Authservice from "../../services/AuthService";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

function PrivateNavbar(props) {
  const logout = () => {
    Authservice.logout();
    props.history.push("/");
    window.location.reload();
  };
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
