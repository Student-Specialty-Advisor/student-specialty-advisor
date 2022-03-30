import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Dropdown from "./Dropdown";
import {
  NavItems,
  DropDownElements1,
  DropDownElements2,
  DropDownElements3,
} from "./NavItems";

function PrivateNavbar(props) {
  const [dropDown, showDropDown] = useState(false);
  const [dropDown2, showDropDown2] = useState(false);
  const [dropDown3, showDropDown3] = useState(false);

  const logout = () => {
    AuthService.logout();
    window.location.href = "/login";
  };
  const isAdmin = AuthService.isAdmin();

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <div className="navbar-logo-container">
            <img
              className="navbar-logo"
              src={props.logo}
              alt="logo is still loading.."
            ></img>
          </div>
        </Link>
        <ul className="nav-items">
          {NavItems.map((item) => {
            if (item.title === "Programs") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => showDropDown(true)}
                  onMouseLeave={() => showDropDown(false)}
                >
                  <Link className="nav-item-link" to={item.path}>
                    {item.title}
                  </Link>
                  {dropDown && (
                    <Dropdown
                      elements={DropDownElements1}
                      classClicked="services-subMenu clicked"
                      classSubMenu="services-subMenu"
                    />
                  )}
                </li>
              );
            } else if (item.title === "Videos") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => showDropDown2(true)}
                  onMouseLeave={() => showDropDown2(false)}
                >
                  <Link className="nav-item-link" to={item.path}>
                    {item.title}
                  </Link>
                  {dropDown2 && (
                    <Dropdown
                      elements={DropDownElements2}
                      classClicked="services-subMenu clicked2"
                      classSubMenu="services-subMenu2"
                    />
                  )}
                </li>
              );
            } else if (item.title === "Meetings") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => showDropDown3(true)}
                  onMouseLeave={() => showDropDown3(false)}
                >
                  <Link className="nav-item-link" to={item.path}>
                    {item.title}
                  </Link>
                  {dropDown3 && (
                    <Dropdown
                      elements={DropDownElements3}
                      classClicked="services-subMenu clicked3"
                      classSubMenu="services-subMenu3"
                    />
                  )}
                </li>
              );
            }

            return (
              <li key={item.id} className={item.cName}>
                <Link className="nav-item-link" to={item.path}>
                  {item.title}
                </Link>
              </li>
            );
          })}
          {isAdmin ? (
            <li className="nav-item">
              <Link to="/statistics">Statistics</Link>
            </li>
          ) : null}
        </ul>
        <div className="btn-container">
          <div className="btn-container">
            <Link to="/profile" className="btn">
              Profile
            </Link>
          </div>
          <div className="btn-container">
            <Link to="/login" className="btn" onClick={logout}>
              Log Out
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PrivateNavbar;
