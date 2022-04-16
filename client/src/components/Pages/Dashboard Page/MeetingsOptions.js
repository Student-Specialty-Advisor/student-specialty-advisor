import React from "react";
import AddMeeting from "./Meetings Options/AddMeeting";
import DeleteMeeting from "./Meetings Options/DeleteMeeting";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function MeetingsOptions(props) {
  const [addKey, setAddKey] = React.useState("addMeeting");
  const [deleteKey, setDeleteKey] = React.useState("deleteMeeting");

  return (
    <ul className="dashboard-options-list">
      <Accordion
        sx={{
          marginBottom: "2%",
          color: "var(--mydarkblue)",
        }}
      >
        <AccordionSummary
          sx={{ border: "solid" }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <strong>Add a Meeting</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <AddMeeting
            key={addKey}
            refresh={() => {
              setAddKey("addMeeting" + new Date().getTime());
            }}
            advisorsList={props.advisorsList}
            setMeetingsList={props.setMeetingsList}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          marginBottom: "2%",
          color: "var(--mydarkblue)",
        }}
      >
        <AccordionSummary
          sx={{ border: "solid" }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <strong>Delete a Meeting</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <DeleteMeeting
            key={deleteKey}
            refresh={() => {
              setDeleteKey("deleteMeeting" + new Date().getTime());
            }}
            meetingsList={props.meetingsList}
            setMeetingsList={props.setMeetingsList}
          />
        </AccordionDetails>
      </Accordion>
    </ul>
  );
}

export default MeetingsOptions;
