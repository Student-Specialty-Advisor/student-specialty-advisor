import React from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import details from "../../../assets/json/program_info.json";
import Footer from "../Footer";

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

  const Curriculum = (props) => {
    const course = details[props.id][section].map((c) => {
      return (
        <div className="course-container" key={props.id + c.subject}>
          <p className="course-title">
            <strong>Subject: </strong>
            {c.subject}
          </p>
          <div className="course-body">
            <p>
              <strong>Description: </strong>
              {c.desc}
            </p>
            <p>
              <strong>When: </strong>
              {c.when}
            </p>
          </div>
        </div>
      );
    });
    return course;
  };

  const Overview = (props) => {
    return (
      <>
        <p>{details[props.id][section]}</p>
        {props.id === "se" ? (
          <NavLink to="/videos/se">
            {"Watch the introductory video about Software Engineering ↗"}
          </NavLink>
        ) : null}
        {props.id === "cse" ? (
          <NavLink to="/videos/cse">
            {
              "Watch the introductory video about Computer Systems Engineering ↗"
            }
          </NavLink>
        ) : null}
        {props.id === "re" ? (
          <NavLink to="/videos/re">
            {
              "Watch the introductory video about Renewable Energy Engineering ↗"
            }
          </NavLink>
        ) : null}
      </>
    );
  };

  const Opportunities = (props) => {
    return (
      <>
        <p style={{ width: "90%", lineHeight: "200%" }}>
          <strong>These are some possible industries you could work in:</strong>
          <br />
          {details[props.id][section]}
        </p>
      </>
    );
  };

  const Outcomes = (props) => {
    return (
      <>
        <p>{details[props.id][section]}</p>
        <a
          href="https://www.abet.org/accreditation/accreditation-criteria/criteria-for-accrediting-engineering-programs-2019-2020/#GC3"
          target="_blank"
          rel="noreferrer noopener"
        >
          What's ABET Student Outcomes? ↗
        </a>
      </>
    );
  };

  const Requirements = (props) => {
    return (
      <>
        <p>{details[props.id][section]}</p>
        <a href="/quiz" target="_blank" rel="noreferrer noopener">
          Program Compatibility Quiz ↗
        </a>
      </>
    );
  };

  const Content = (props) => {
    return (
      <li key={props.id} ref={props.myRef} id={props.id}>
        {section === "overview" ? (
          <>
            <Overview id={props.id} />
          </>
        ) : null}

        {section === "curriculum" ? (
          <>
            <Curriculum id={props.id} />
          </>
        ) : null}

        {section === "outcomes" ? <Outcomes id={props.id} /> : null}
        {section === "opportunities" ? <Opportunities id={props.id} /> : null}
        {section === "requirements" ? <Requirements id={props.id} /> : null}
      </li>
    );
  };

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
