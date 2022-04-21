import React from "react";
import AddVideo from "./Videos Options/AddVideo";
import DeleteVideo from "./Videos Options/DeleteVideo";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function VideosOptions(props) {
  const [addKey, setAddKey] = React.useState("addVideo");
  const [deleteKey, setDeleteKey] = React.useState("deleteVideo");

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
          <Typography
            className="dashboard-option-typography"
            sx={{ width: "33%", flexShrink: 0 }}
          >
            <strong>Add a Video</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <AddVideo
            key={addKey}
            refresh={() => {
              setAddKey("addVideo" + new Date().getTime());
            }}
            setVideosList={props.setVideosList}
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
          <Typography
            className="dashboard-option-typography"
            sx={{ width: "33%", flexShrink: 0 }}
          >
            <strong>Delete a Video</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <DeleteVideo
            key={deleteKey}
            refresh={() => {
              setDeleteKey("deleteVideo" + new Date().getTime());
            }}
            videosList={props.videosList}
            setVideosList={props.setVideosList}
          />
        </AccordionDetails>
      </Accordion>
    </ul>
  );
}

export default VideosOptions;
