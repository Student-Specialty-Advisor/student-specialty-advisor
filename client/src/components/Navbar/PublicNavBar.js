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
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn">Sign Up</button>
        </Link>
      </nav>
    </>
  );
}

export default PublicNavbar;
