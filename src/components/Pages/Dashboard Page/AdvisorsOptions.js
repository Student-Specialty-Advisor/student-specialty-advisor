import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import AddAdvisor from "./Advisors Options/AddAdvisor";
import DeleteAdvisor from "./Advisors Options/DeleteAdvisor";
import UpdateAdvisor from "./Advisors Options/UpdateAdvisor";

function AdvisorsOptions(props) {
  const [addKey, setAddKey] = React.useState("addAdvisor");
  const [deleteKey, setDeleteKey] = React.useState("deleteAdvisor");
  const [updateKey, setUpdateKey] = React.useState("updateAdvisor");
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
            <strong>Add an Advisor</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <AddAdvisor
            key={addKey}
            refresh={() => {
              setAddKey("addAdvisor" + new Date().getTime());
            }}
            setAdvisorsList={props.setAdvisorsList}
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
            <strong>Delete an Advisor</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <DeleteAdvisor
            key={deleteKey}
            refresh={() => {
              setDeleteKey("deleteAdvisor" + new Date().getTime());
            }}
            setAdvisorsList={props.setAdvisorsList}
            advisorsList={props.advisorsList}
            meetingsList={props.meetingsList}
            history={props.history}
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
            <strong>Update an Advisor</strong>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
          <UpdateAdvisor
            key={updateKey}
            refresh={() => {
              setUpdateKey("updateAdvisor" + new Date().getTime());
            }}
            setAdvisorsList={props.setAdvisorsList}
            advisorsList={props.advisorsList}
          />
        </AccordionDetails>
      </Accordion>
    </ul>
  );
}

export default AdvisorsOptions;
