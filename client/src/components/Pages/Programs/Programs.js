import React from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import details from "../../../assets/json/program_info.json";
import { completeAchievement } from "../../../services/achievements";
import Footer from "../Footer";
import Curriculum from "./Curriculum";
import Overview from "./Overview";
import Opportunities from "./Opportunities";
import Outcomes from "./Outcomes";
import Requirements from "./Requirements";

const SECTIONS = [
  "overview",
  "curriculum",
  "outcomes",
  "opportunities",
  "requirements",
];

function Programs() {
  let { specialty, section } = useParams();
  const [title, setTitle] = React.useState("");

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
      <div key={"container of " + specialty} className="program-info-container">
        <a
          className="program-info-brochure"
          href="https://www.smu.tn/storage/app/media/brochures/Medtech/catalogue_MedTech_2021.pdf"
          target="_blank"
          rel="noreferrer noopener"
        >
          Check out the official MedTech Brochure ↗
        </a>
        <h1 className="program-info-container-title">{title}</h1>
        <ul className="program-info-navbar">
          <li id="overview">
            <NavLink to={"/programs/" + specialty + "/overview"}>
              Overview
            </NavLink>
          </li>
          <li id="curriculum">
            <NavLink to={"/programs/" + specialty + "/curriculum"}>
              Curriculum
            </NavLink>
          </li>
          <li id="outcomes">
            <NavLink to={"/programs/" + specialty + "/outcomes"}>
              Outcomes
            </NavLink>
          </li>
          <li id="opportunities">
            <NavLink to={"/programs/" + specialty + "/opportunities"}>
              Opportunities
            </NavLink>
          </li>
          <li id="requirements">
            <NavLink to={"/programs/" + specialty + "/requirements"}>
              Requirements
            </NavLink>
          </li>
        </ul>
        <ul className="program-info-content">
          <Content id={specialty} title="Software Engineering" />
        </ul>
      </div>
      <Footer id="no-margin" />
    </>
  ) : (
    <Redirect to={"/programs/" + specialty + "/overview"} />
  );
}

export default Programs;
