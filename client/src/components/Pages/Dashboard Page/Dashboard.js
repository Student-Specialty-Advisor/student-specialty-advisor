import React from "react";
import { useParams, NavLink, Redirect } from "react-router-dom";
import Statistics from "./Statistics";
import AdvisorsOptions from "./AdvisorsOptions";
import MeetingsOptions from "./MeetingsOptions";
import VideosOptions from "./VideosOptions";

const STATISTICS = "statistics";
const ADVISORS = "advisors";
const MEETINGS = "meetings";
const VIDEOS = "videos";
const PARAMETERS = [STATISTICS, ADVISORS, MEETINGS, VIDEOS];

const Dashboard = () => {
  let { parameter } = useParams();
  React.useEffect(() => {
    document.title =
      "Dashboard - " +
      parameter[0].toUpperCase() +
      parameter.slice(1) +
      " - Student Specialty Advisor";
  }, [parameter]);

  const setupSideBar = () => {
    var statistics = document.getElementById(STATISTICS);
    var advisors = document.getElementById(ADVISORS);
    var meetings = document.getElementById(MEETINGS);
    var videos = document.getElementById(VIDEOS);
    switch (parameter) {
      case STATISTICS:
        statistics.className = "active";
        advisors.className = "";
        meetings.className = "";
        videos.className = "";
        break;
      case ADVISORS:
        statistics.className = "";
        advisors.className = "active";
        meetings.className = "";
        videos.className = "";
        break;
      case MEETINGS:
        statistics.className = "";
        advisors.className = "";
        meetings.className = "active";
        videos.className = "";
        break;
      case VIDEOS:
        statistics.className = "";
        advisors.className = "";
        meetings.className = "";
        videos.className = "active";
        break;
      default:
        break;
    }
  };
  React.useEffect(setupSideBar);

  return PARAMETERS.includes(parameter) ? (
    <>
      <div className="dashboard-container">
        <ul className="side-bar">
          <h1>
            ADMIN
            <br />
            DASHBOARD
          </h1>
          <li id={STATISTICS}>
            <NavLink
              to={"/dashboard/" + STATISTICS}
              text={STATISTICS[0].toUpperCase() + STATISTICS.slice(1)}
            >
              {STATISTICS[0].toUpperCase() + STATISTICS.slice(1)}
            </NavLink>
          </li>
          <li id={ADVISORS}>
            <NavLink
              to={"/dashboard/" + ADVISORS}
              text={ADVISORS[0].toUpperCase() + ADVISORS.slice(1)}
            >
              {ADVISORS[0].toUpperCase() + ADVISORS.slice(1)}
            </NavLink>
          </li>
          <li id={MEETINGS}>
            <NavLink
              to={"/dashboard/" + MEETINGS}
              text={MEETINGS[0].toUpperCase() + MEETINGS.slice(1)}
            >
              {MEETINGS[0].toUpperCase() + MEETINGS.slice(1)}
            </NavLink>
          </li>
          <li id={VIDEOS}>
            <NavLink
              to={"/dashboard/" + VIDEOS}
              text={VIDEOS[0].toUpperCase() + VIDEOS.slice(1)}
            >
              {VIDEOS[0].toUpperCase() + VIDEOS.slice(1)}
            </NavLink>
          </li>
        </ul>
        <ul className="dashboard-options">
          {parameter === STATISTICS ? (
            <Statistics />
          ) : parameter === ADVISORS ? (
            <AdvisorsOptions />
          ) : parameter === MEETINGS ? (
            <MeetingsOptions />
          ) : parameter === VIDEOS ? (
            <VideosOptions />
          ) : null}
        </ul>
      </div>
    </>
  ) : (
    <Redirect to={"/dashboard/" + STATISTICS} />
  );
};

export default Dashboard;
