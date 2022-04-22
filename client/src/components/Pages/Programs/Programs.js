import React from "react";
import { Redirect, useParams } from "react-router-dom";
import details from "../../../assets/json/program_info.json";
import { completeAchievement } from "../../../services/achievements";
import Footer from "../Footer";
import Curriculum from "./Curriculum";
import Overview from "./Overview";
import Opportunities from "./Opportunities";
import Outcomes from "./Outcomes";
import Requirements from "./Requirements";
import { Tab, Box, Tabs } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import ProgramsBottomNavbar from "./ProgramsBottomNavbar";

const SECTIONS = [
  "overview",
  "curriculum",
  "outcomes",
  "opportunities",
  "requirements",
];

const SPECIALTIES = ["se", "cse", "re"];

function Programs(props) {
  let { specialty, section } = useParams();
  const [title, setTitle] = React.useState("");
  const [tabValue, setTabValue] = React.useState(SECTIONS.indexOf(section));
  const isMobile = useMediaQuery("(max-width:1080px)");

  React.useEffect(() => {
    document.title =
      specialty.toUpperCase() +
      " - " +
      section[0].toUpperCase() +
      section.slice(1) +
      " - Student Specialty Advisor";
  }, [specialty, section]);

  React.useEffect(() => {
    if (specialty === "se") {
      setTitle("Software Engineering >");
    } else if (specialty === "cse") {
      setTitle("Computer Systems Engineering >");
    } else if (specialty === "re") {
      setTitle("Renewable Energy Engineering >");
    }
  }, [specialty]);

  const Content = (props) => {
    return (
      <li key={props.id} ref={props.myRef} id={props.id}>
        {section === "overview" ? (
          <Overview id={props.id} section={section} details={details} />
        ) : null}
        {section === "curriculum" ? (
          <Curriculum id={props.id} section={section} details={details} />
        ) : null}
        {section === "outcomes" ? (
          <Outcomes id={props.id} section={section} details={details} />
        ) : null}
        {section === "opportunities" ? (
          <Opportunities id={props.id} section={section} details={details} />
        ) : null}
        {section === "requirements" ? (
          <Requirements id={props.id} section={section} details={details} />
        ) : null}
      </li>
    );
  };

  React.useEffect(() => {
    let achievementTimer = setTimeout(
      () =>
        completeAchievement(
          "infoSectionCompletion",
          "All kinds of information"
        ),
      60000
    );
    return () => {
      clearTimeout(achievementTimer);
    };
  }, []);

  return SECTIONS.includes(section) ? (
    <>
      <div className="program-info-container">
        <h1 className="program-info-container-title">{title}</h1>
        <a
          className="program-info-brochure"
          href="https://www.smu.tn/storage/app/media/brochures/Medtech/catalogue_MedTech_2021.pdf"
          target="_blank"
          rel="noreferrer noopener"
        >
          Check out the official MedTech Brochure ↗
        </a>
        <Box
          marginTop={isMobile ? "3%" : "1%"}
          display={isMobile && "flex"}
          justifyContent={isMobile && "center"}
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderRight: 1,
            borderLeft: 1,
            borderWidth: 2,
            borderBottomWidth: 1,
            borderColor: "var(--myblue)",
            bgcolor: "white",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => {
              setTabValue(newValue);
            }}
            textColor="inherit"
            sx={{ color: "var(--myblue)" }}
            TabIndicatorProps={{ sx: { bgcolor: "var(--myblue)" } }}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={true}
            allowScrollButtonsMobile
          >
            <Tab
              onClick={() => {
                props.history.push("/programs/" + specialty + "/overview");
              }}
              label="Overview"
            />
            <Tab
              onClick={() => {
                props.history.push("/programs/" + specialty + "/curriculum");
              }}
              label="Curriculum"
            />
            <Tab
              onClick={() => {
                props.history.push("/programs/" + specialty + "/outcomes");
              }}
              label="Outcomes"
            />
            <Tab
              onClick={() => {
                props.history.push("/programs/" + specialty + "/opportunities");
              }}
              label="Opportunities"
            />
            <Tab
              onClick={() => {
                props.history.push("/programs/" + specialty + "/requirements");
              }}
              label="Requirements"
            />
          </Tabs>
        </Box>
        <Box
          sx={{
            borderBottom: 1,
            borderRight: 1,
            borderLeft: 1,
            borderWidth: 2,
            borderColor: "var(--myblue)",
            bgcolor: "white",
          }}
        >
          <ul className="program-info-content">
            <Content id={specialty} title="Software Engineering" />
          </ul>
        </Box>
      </div>
      {isMobile ? (
        <ProgramsBottomNavbar
          isMobile={isMobile}
          initialValue={SPECIALTIES.indexOf(specialty)}
          section={section}
          history={props.history}
        />
      ) : (
        <Footer id="no-margin" />
      )}
    </>
  ) : (
    <Redirect to={"/programs/" + specialty + "/overview"} />
  );
}

export default Programs;
