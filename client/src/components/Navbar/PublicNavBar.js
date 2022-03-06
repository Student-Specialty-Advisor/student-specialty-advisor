import React from "react";
import { Link } from "react-router-dom";

function PublicNavbar(props) {
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
        <div className="btn-container">
          <div className="btn-container">
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
          <div className="btn-container">
            <Link to="/signup" className="btn">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PublicNavbar;
