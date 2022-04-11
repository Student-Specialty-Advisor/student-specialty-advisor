import React from "react";
import AddAdvisor from "./Advisors Options/AddAdvisor";
import DeleteAdvisor from "./Advisors Options/DeleteAdvisor";
import UpdateAdvisor from "./Advisors Options/UpdateAdvisor";

function AdvisorsOptions(props) {
  return (
    <ul className="dashboard-options-list">
      <li key="a0">
        <AddAdvisor setAdvisorsList={props.setAdvisorsList} />
      </li>
      <li key="a1">
        <DeleteAdvisor
          setAdvisorsList={props.setAdvisorsList}
          advisorsList={props.advisorsList}
        />
      </li>
      <li key="a2">
        <UpdateAdvisor
          setAdvisorsList={props.setAdvisorsList}
          advisorsList={props.advisorsList}
        />
      </li>
    </ul>
  );
}

export default AdvisorsOptions;
