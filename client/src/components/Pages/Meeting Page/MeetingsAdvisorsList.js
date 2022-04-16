import React from "react";
import AdvisorCard from "./AdvisorCard";
import fetchService from "../../../services/fetchService";
import Footer from "../Footer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { StyledButton } from "../../Basic Elements/StyledBasicElements";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function MeetingsAdvisorsList() {
  React.useEffect(() => {
    document.title = "Meetings - Advisors - Student Specialty Advisor";
    getAdvisorsList();
  }, []);
  const [advisors, setAdvisors] = React.useState([]);
  const getAdvisorsList = async () => {
    const json = await fetchService.doGET("meeting/advisors");
    setAdvisors(json);
  };

  const mappingFunction = (advisor) => {
    return (
      <AdvisorCard
        key={advisor._id}
        fullname={advisor.fullName}
        picture={advisor.imageUrl}
        profession={advisor.profession}
        quote={advisor.quote}
        email={advisor.email}
        linkedin={advisor.linkedinUrl}
      />
    );
  };

  const advisorsSE = advisors.filter((advisor) => {
    return advisor.specialty === "SE";
  });
  const advisorsCSE = advisors.filter((advisor) => {
    return advisor.specialty === "CSE";
  });
  const advisorsREE = advisors.filter((advisor) => {
    return advisor.specialty === "REE";
  });

  return (
    <>
      <div className="about-container-header">
        <h1>Meet the Team!</h1>
        <h4>Get the guidance you need from friends and familiar faces</h4>
        <p>
          <strong>Want to be the change?</strong>
        </p>
        <StyledButton
          size="large"
          sx={{ width: "20%" }}
          variant="contained"
          onClick={() => {
            window.location.href = "the form link";
          }}
        >
          Become an advisor
        </StyledButton>
      </div>
      <div className="meetings-advisors-accordion">
        <Accordion
          sx={{
            color: "var(--mydarkblue)",
          }}
        >
          <AccordionSummary
            sx={{ border: "solid" }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              <strong>Software Engineering Advisors</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
            <div className="meetings-advisors-list">
              {advisorsSE.map(mappingFunction)}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            color: "var(--mydarkblue)",
          }}
        >
          <AccordionSummary
            sx={{ border: "solid", marginTop: "2%" }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              <strong>Computer Systems Engineering Advisors</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
            <div className="meetings-advisors-list">
              {advisorsCSE.map(mappingFunction)}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            color: "var(--mydarkblue)",
          }}
        >
          <AccordionSummary
            sx={{ border: "solid", marginTop: "2%" }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              <strong>Renewable Energy Engineering Advisors</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ border: "solid", borderTopStyle: "none" }}>
            <div className="meetings-advisors-list">
              {advisorsREE.map(mappingFunction)}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <Footer />
    </>
  );
}

export default MeetingsAdvisorsList;
