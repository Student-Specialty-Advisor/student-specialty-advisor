import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <ul
        className={dropDown ? props.classClicked : props.classSubMenu}
        onClick={() => setDropDown(!dropDown)}
      >
        {props.elements.map((item) => {
          return (
            <li key={item.id}>
              <Link
                to={item.path}
                className={item.cName}
                onClick={() => {
                  setDropDown(false);
                  window.scrollTo(0, 0);
                }}
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
