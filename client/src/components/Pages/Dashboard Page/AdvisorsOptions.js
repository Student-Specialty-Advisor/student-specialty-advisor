import React from "react";
import AddAdvisor from "./Advisors Options/AddAdvisor";
import DeleteAdvisor from "./Advisors Options/DeleteAdvisor";

function AdvisorsOptions(props) {
  return (
    <ul className="dashboard-options-list">
      <li>
        <AddAdvisor setAdvisorsList={props.setAdvisorsList} />
      </li>
      <li>
        <DeleteAdvisor
          setAdvisorsList={props.setAdvisorsList}
          advisorsList={props.advisorsList}
        />
      </li>
      <li>
        <p>Your component goes here inside the li</p>
      </li>
    </ul>
  );
}

export default AdvisorsOptions;
