import React from "react";
import { useParams, NavLink, Redirect } from "react-router-dom";
import Statistics from "./Statistics";
import AdvisorsOptions from "./AdvisorsOptions";
import MeetingsOptions from "./MeetingsOptions";
import VideosOptions from "./VideosOptions";
import fetchService from "../../../services/fetchService";
import { BottomNavigationAction, Paper, useMediaQuery } from "@mui/material";
import VideosIcon from "@mui/icons-material/VideoLibrary";
import StatIcon from "@mui/icons-material/BarChart";
import AdvisorsIcon from "@mui/icons-material/Groups";
import MeetingsIcon from "@mui/icons-material/CalendarMonth";
import { StyledBottomNavigation } from "../../Basic Elements/StyledBasicElements";

const STATISTICS = "statistics";
const ADVISORS = "advisors";
const MEETINGS = "meetings";
const VIDEOS = "videos";
const PARAMETERS = [STATISTICS, ADVISORS, MEETINGS, VIDEOS];

const Dashboard = (props) => {
  let { parameter } = useParams();
  const [advisorsList, setAdvisorsList] = React.useState([]);
  const [meetingsList, setMeetingsList] = React.useState({ meetings: [] });
  const [videosList, setVideosList] = React.useState([]);
  const [mobileBarValue, setMobileBarValue] = React.useState(0);
  const isMobile = useMediaQuery("(max-width:1080px)");

  React.useEffect(() => {
    document.title =
      "Dashboard - " +
      parameter[0].toUpperCase() +
      parameter.slice(1) +
      " - Student Specialty Advisor";
  }, [parameter]);

  const fetchAdvisors = async () => {
    const list = await fetchService.doGET("meeting/advisors");
    setAdvisorsList(list);
  };
  const fetchMeetings = async () => {
    const list = await fetchService.doGET("meeting/schedule");
    setMeetingsList(list);
  };
  const fetchVideos = async () => {
    const list = await fetchService.doGET("videos");
    setVideosList(list);
  };

  const fetchAll = () => {
    fetchAdvisors();
    fetchMeetings();
    fetchVideos();
  };

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

  React.useEffect(fetchAll, []);

  React.useEffect(() => {
    if (!isMobile) {
      setupSideBar();
    }
  });

  return PARAMETERS.includes(parameter) ? (
    <>
      <div className="dashboard-container">
        {isMobile ? (
          <>
            <Paper
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 12,
              }}
            >
              <StyledBottomNavigation
                showLabels
                className="mobile-bottom-bar"
                value={mobileBarValue}
                onChange={(event, newValue) => {
                  setMobileBarValue(newValue);
                }}
              >
                <BottomNavigationAction
                  className="mobile-bottom-bar-element"
                  label="Statistics"
                  onClick={() => {
                    props.history.push("/dashboard/statistics");
                  }}
                  icon={<StatIcon fontSize="large" />}
                />
                <BottomNavigationAction
                  className="mobile-bottom-bar-element"
                  label="Advisors"
                  icon={<AdvisorsIcon fontSize="large" />}
                  onClick={() => {
                    props.history.push("/dashboard/advisors");
                  }}
                />
                <BottomNavigationAction
                  className="mobile-bottom-bar-element"
                  label="Meetings"
                  icon={<MeetingsIcon fontSize="large" />}
                  onClick={() => {
                    props.history.push("/dashboard/meetings");
                  }}
                />
                <BottomNavigationAction
                  className="mobile-bottom-bar-element"
                  label="Videos"
                  onClick={() => {
                    props.history.push("/dashboard/videos");
                  }}
                  icon={<VideosIcon fontSize="large" />}
                />
              </StyledBottomNavigation>
            </Paper>
          </>
        ) : (
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
        )}

        <ul className="dashboard-options">
          {parameter === STATISTICS ? (
            <Statistics />
          ) : parameter === ADVISORS ? (
            <AdvisorsOptions
              advisorsList={advisorsList}
              setAdvisorsList={fetchAdvisors}
              meetingsList={meetingsList}
            />
          ) : parameter === MEETINGS ? (
            <MeetingsOptions
              advisorsList={advisorsList}
              meetingsList={meetingsList}
              setMeetingsList={fetchMeetings}
            />
          ) : parameter === VIDEOS ? (
            <VideosOptions
              videosList={videosList}
              setVideosList={fetchVideos}
            />
          ) : null}
        </ul>
      </div>
    </>
  ) : (
    <Redirect to={"/dashboard/" + STATISTICS} />
  );
};

export default Dashboard;
