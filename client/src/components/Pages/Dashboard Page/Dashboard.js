import React from "react";
import { useParams, NavLink, Redirect } from "react-router-dom";
import Statistics from "../Statistics";
const PARAMETERS = ["statistics", "advisor", "meeting"];

const Dashboard = () => {
  let { parameter } = useParams();
  React.useEffect(() => {
    document.title = parameter + "Dashboard - Student Specialty Advisor";
  }, [parameter]);

  const setupItemOfDashboard = () => {
    if (parameter === "statistics") return <Statistics />;
    else if (parameter === "advisor") return <div>Edit Advisor Here</div>;
    else if (parameter === "meeting") return <div>Edit Meeting Here</div>;
  };
  const showItemofDashboard = setupItemOfDashboard();
  const setupSideBar = () => {
    var statistics = document.getElementById("statistics");
    var advisor = document.getElementById("advisor");
    var meeting = document.getElementById("meeting");
    if (parameter === "statistics") {
      statistics.className = "active";
      advisor.className = "";
      meeting.className = "";
      statistics.children[0].disabled = true;
    } else if (parameter === "advisor") {
      statistics.className = "";
      advisor.className = "active";
      meeting.className = "";
    } else if (parameter === "meeting") {
      statistics.className = "";
      advisor.className = "";
      meeting.className = "active";
    }
  };
  React.useEffect(setupSideBar);

  return PARAMETERS.includes(parameter) ? (
    <>
      <div className="videos-container">
        <ul className="side-bar">
          <li id="statistics">
            <NavLink to="/dashboard/statistics" text="Statistics">
              Statistics
            </NavLink>
          </li>
          <li id="advisor">
            <NavLink to="/dashboard/advisor" text="Advisor">
              Advisor
            </NavLink>
          </li>
          <li id="meeting">
            <NavLink to="/dashboard/meeting" text="Meeting">
              Meeting
            </NavLink>
          </li>
        </ul>
        <ul className="videos-list">{showItemofDashboard}</ul>
      </div>
    </>
  ) : (
    <Redirect to="/dashboard/statistics" />
  );
};

export default Dashboard;
