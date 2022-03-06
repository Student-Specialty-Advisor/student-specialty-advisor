import React, { useState } from "react";
import { DropDownElements1 } from "./NavItems";

import { Link } from "react-router-dom";
import "./Navbar.css";
const Dropdown = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <ul
        className={dropDown ? "services-subMenu clicked" : "services-subMenu"}
        onClick={() => setDropDown(!dropDown)}
      >
        {DropDownElements1.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                onClick={() => setDropDown(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Dropdown;
