import React from "react";
import AddAdvisor from "./Advisors Options/AddAdvisor";

function AdvisorsOptions(props) {
  return (
    <ul className="dashboard-options-list">
      <li>
        <AddAdvisor />
      </li>
      <li>
        <p>Your component goes here inside the li</p>
      </li>
      <li>
        <p>Your component goes here inside the li</p>
      </li>
    </ul>
  );
}

export default AdvisorsOptions;
