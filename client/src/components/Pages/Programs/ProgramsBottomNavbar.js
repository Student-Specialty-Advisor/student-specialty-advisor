import { BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import { StyledBottomNavigation } from "../../Basic Elements/StyledBasicElements";
import SEIcon from "@mui/icons-material/Code";
import CSIcon from "@mui/icons-material/MemoryOutlined";
import REIcon from "@mui/icons-material/WindPowerOutlined";

function ProgramsBottomNavbar(props) {
  const [mobileBarValue, setMobileBarValue] = React.useState(
    props.initialValue
  );
  return (
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
          label="Software"
          onClick={() => {
            props.history.push("/programs/se/" + props.section);
            window.scrollTo(0, 0);
          }}
          icon={<SEIcon fontSize="large" />}
        />
        <BottomNavigationAction
          className="mobile-bottom-bar-element"
          label="Systems"
          icon={<CSIcon fontSize="large" />}
          onClick={() => {
            props.history.push("/programs/cse/" + props.section);
            window.scrollTo(0, 0);
          }}
        />
        <BottomNavigationAction
          className="mobile-bottom-bar-element"
          label="Renewable"
          icon={<REIcon fontSize="large" />}
          onClick={() => {
            props.history.push("/programs/re/" + props.section);
            window.scrollTo(0, 0);
          }}
        />
      </StyledBottomNavigation>
    </Paper>
  );
}

export default ProgramsBottomNavbar;
