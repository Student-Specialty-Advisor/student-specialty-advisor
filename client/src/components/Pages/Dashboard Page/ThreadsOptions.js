import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddThread from "./Threads Options/AddThread";
import RenameThread from "./Threads Options/RenameThread";
import DeleteThread from "./Threads Options/DeleteThread";

function ThreadsOptions(props) {
  const [addKey, setAddKey] = React.useState("addThread");
  const [deleteKey, setDeleteKey] = React.useState("deleteThread");
  const [updateKey, setUpdateKey] = React.useState("updateThread");
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
            <strong>Add a Thread</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <AddThread
            key={addKey}
            refresh={() => {
              setAddKey("addThread" + new Date().getTime());
            }}
            setThreadsList={props.setThreadsList}
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
            <strong>Delete a Thread</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <DeleteThread
            key={deleteKey}
            refresh={() => {
              setDeleteKey("deleteThread" + new Date().getTime());
            }}
            setThreadsList={props.setThreadsList}
            threadsList={props.threadsList}
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
            <strong>Rename a Thread</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <RenameThread
            key={updateKey}
            refresh={() => {
              setUpdateKey("updateThread" + new Date().getTime());
            }}
            setThreadsList={props.setThreadsList}
            threadsList={props.threadsList}
          />
        </AccordionDetails>
      </Accordion>
    </ul>
  );
}

export default ThreadsOptions;
