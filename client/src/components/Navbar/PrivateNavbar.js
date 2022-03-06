import React, { useState } from "react";
import Authservice from "../../services/AuthService";
import Dropdown from "./Dropdown";
import Dropdown2 from "./Dropdown2";
import Dropdown3 from "./Dropdown3";

import { NavItems } from "./NavItems";
import { Link } from "react-router-dom";
function PrivateNavbar(props) {
  const [dropDown, showDropDown] = useState(false);
  const [dropDown2, showDropDown2] = useState(false);
  const [dropDown3, showDropDown3] = useState(false);

  const logout = () => {
    AuthService.logout();
    props.history.push("/login");
    window.location.reload();
  };

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
                  <Link to={item.path}>{item.title}</Link>
                  {dropDown && <Dropdown />}
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
                  <Link to={item.path}>{item.title}</Link>
                  {dropDown2 && <Dropdown2 />}
                </li>
              );
            } else if (item.title === "Meeting") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => showDropDown3(true)}
                  onMouseLeave={() => showDropDown3(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropDown3 && <Dropdown3 />}
                </li>
              );
            }

            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>

        <Link to="/profile">
          <button className="btn">Profile</button>
        </Link>
        <button className="btn" onClick={logout}>
          Log Out
        </button>
      </nav>
    </>
  );
}

export default PrivateNavbar;
