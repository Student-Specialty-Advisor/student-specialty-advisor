import React, { useState } from "react";
import { DropDownElements3 } from "./NavItems";

import { Link } from "react-router-dom";
import "./Navbar.css";
const Dropdown3 = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <ul
        className={dropDown ? "services-subMenu clicked3" : "services-subMenu3"}
        onClick={() => setDropDown(!dropDown)}
      >
        {DropDownElements3.map((item) => {
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

export default Dropdown3;
