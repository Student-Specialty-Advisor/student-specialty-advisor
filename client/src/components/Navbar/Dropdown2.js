import React, { useState } from "react";
import { DropDownElements2 } from "./NavItems";

import { Link } from "react-router-dom";
import "./Navbar.css";
const Dropdown2 = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <ul
        className={dropDown ? "services-subMenu clicked2" : "services-subMenu2"}
        onClick={() => setDropDown(!dropDown)}
      >
        {DropDownElements2.map((item) => {
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

export default Dropdown2;
