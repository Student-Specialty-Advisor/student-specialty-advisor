import React from "react";
import { BottomNavigationAction, Paper, useMediaQuery } from "@mui/material";
import { StyledBottomNavigation } from "../../Basic Elements/StyledBasicElements";
import AboutIcon from "@mui/icons-material/Info";
import AdvisorsIcon from "@mui/icons-material/Groups";
import ScheduleIcon from "@mui/icons-material/Schedule";
const MeetingBottomNavbar = (props) => {
  const PAGES = ["/meetings/about", "/meetings/advisors", "/meetings/schedule"];
  const isMobile = useMediaQuery("(max-width:1080px)");
  const [mobileBarValue, setMobileBarValue] = React.useState(
    PAGES.indexOf(window.location.pathname)
  );
  return (
    isMobile && (
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
            label="About"
            onClick={() => {
              props.history.push("/meetings/about");
            }}
            icon={<AboutIcon fontSize="large" />}
          />
          <BottomNavigationAction
            className="mobile-bottom-bar-element"
            label="Advisors"
            icon={<AdvisorsIcon fontSize="large" />}
            onClick={() => {
              props.history.push("/meetings/advisors");
            }}
          />
          <BottomNavigationAction
            className="mobile-bottom-bar-element"
            label="Schedule"
            icon={<ScheduleIcon fontSize="large" />}
            onClick={() => {
              props.history.push("/meetings/schedule");
            }}
          />
        </StyledBottomNavigation>
      </Paper>
    )
  );
};

export default MeetingBottomNavbar;
