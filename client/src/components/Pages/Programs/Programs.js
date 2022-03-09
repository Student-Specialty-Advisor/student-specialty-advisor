import React from "react";
import { NavLink } from "react-router-dom";
import Footer from "../Footer";


function Programs() {

  return (
    <div>
      <h1>""</h1>
      <h1>
        here you may be able to see what are the presented courses for each year
      </h1>
      
        <>
          <div className="progemas-container">
              <li id="se">
                <NavLink to="/programs/se" text="Software Engineering">
                  Software Engineering
                </NavLink>
              </li>
              <li id="cse">
                <NavLink to="/programs/cse" text="Computer Systems Engineering">
                  Computer Systems Engineering
                </NavLink>
              </li>
              <li id="re">
                <NavLink to="/programs/re" text="Renewable Energy Engineering">
                  Renewable Energy Engineering
                </NavLink>
              </li>
          
          </div>
          {/* <Footer id="no-margin" /> */}
        </>
      
    </div>
  );
}

export default Programs;
