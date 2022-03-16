import React from "react";
import { NavLink, useParams } from "react-router-dom";
import details from "../../../assets/json/program_info.json";
import Footer from "../Footer";

function Programs() {
  let { section } = useParams();
  const elementSE = React.useRef(null);
  const elementCSE = React.useRef(null);
  const elementRE = React.useRef(null);

  React.useEffect(() => {
    document.title =
      section[0].toUpperCase() +
      section.slice(1) +
      " - Student Specialty Advisor";
  }, [section]);

  const changeToViewAll = () => {
    elementSE.current.className = "visible";
    elementCSE.current.className = "visible";
    elementRE.current.className = "visible";
  };
  const changeToViewOne = () => {
    if (
      elementSE.current.className === "hidden" ||
      elementCSE.current.className === "hidden" ||
      elementRE.current.className === "hidden"
    ) {
      return;
    }
    elementSE.current.className = "visible-alone";
    elementCSE.current.className = "hidden";
    elementRE.current.className = "hidden";
  };

  const leftArrow = () => {
    if (elementSE.current.className === "visible-alone") {
      elementSE.current.className = "hidden";
      elementCSE.current.className = "hidden";
      elementRE.current.className = "visible-alone";
    } else if (elementCSE.current.className === "visible-alone") {
      elementSE.current.className = "visible-alone";
      elementCSE.current.className = "hidden";
      elementRE.current.className = "hidden";
    } else if (elementRE.current.className === "visible-alone") {
      elementSE.current.className = "hidden";
      elementCSE.current.className = "visible-alone";
      elementRE.current.className = "hidden";
    }
  };

  const rightArrow = () => {
    if (elementSE.current.className === "visible-alone") {
      elementSE.current.className = "hidden";
      elementCSE.current.className = "visible-alone";
      elementRE.current.className = "hidden";
    } else if (elementCSE.current.className === "visible-alone") {
      elementSE.current.className = "hidden";
      elementCSE.current.className = "hidden";
      elementRE.current.className = "visible-alone";
    } else if (elementRE.current.className === "visible-alone") {
      elementSE.current.className = "visible-alone";
      elementCSE.current.className = "hidden";
      elementRE.current.className = "hidden";
    }
  };

  const Curriculum = (props) => {
    const course = details[props.id][section].map((c) => {
      return (
        /*<>
          <p>{"subject: " + c.subject}</p>
          <p>{"type: " + c.desc}</p>
          <p>{"when: " + c.when}</p>
        </>*/
        <>
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
        </>
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
            {"Watch the introductory video about Software Eng."}
          </NavLink>
        ) : null}
        {props.id === "cse" ? (
          <NavLink to="/videos/cse">
            {"Watch the introductory video about Computer Systems Eng."}
          </NavLink>
        ) : null}
        {props.id === "re" ? (
          <NavLink to="/videos/re">
            {"Watch the introductory video about Renewable Energy Eng."}
          </NavLink>
        ) : null}
      </>
    );
  };

  const Content = (props) => {
    return (
      <li ref={props.myRef} id={props.id} className="visible">
        <ul>
          <div
            onClick={leftArrow}
            style={{ transform: "scaleX(-1)" }}
            className="nav-arrow"
          ></div>
          <h4>{props.title}</h4>
          <div onClick={rightArrow} className="nav-arrow"></div>
        </ul>

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

        {section === "objectives" ||
        section === "opportunities" ||
        section === "requirements" ? (
          <>
            <p>{details[props.id][section]}</p>
          </>
        ) : null}
      </li>
    );
  };

  return (
    <>
      <div className="program-info-container">
        <ul className="program-info-navbar">
          <li id="overview">
            <NavLink to="/programs/overview">Overview</NavLink>
          </li>
          <li id="curriculum">
            <NavLink to="/programs/curriculum">Curriculum</NavLink>
          </li>
          <li id="objectives">
            <NavLink to="/programs/objectives">Objectives</NavLink>
          </li>
          <li id="opportunities">
            <NavLink to="/programs/opportunities">Opportunities</NavLink>
          </li>
          <li id="requirements">
            <NavLink to="/programs/requirements">Requirements</NavLink>
          </li>
        </ul>
        <ul className="program-info-view">
          <p>Change View:</p>
          <button onClick={changeToViewAll}>View All</button>
          <button onClick={changeToViewOne}>View 1 by 1</button>
          <a
            href="https://www.smu.tn/storage/app/media/brochures/Medtech/catalogue_MedTech_2021.pdf"
            target="_blank"
            rel="noreferrer noopener"
          >
            Check out the official MedTech Brochure ↗
          </a>
        </ul>
        <ul className="program-info-content">
          <Content myRef={elementSE} id="se" title="Software Engineering" />
          <Content
            myRef={elementCSE}
            id="cse"
            title="Computer Systems Engineering"
          />
          <Content
            myRef={elementRE}
            id="re"
            title="Renewable Energy Engineering"
          />
        </ul>
      </div>
      <Footer id="no-margin" />
    </>
  );
}

export default Programs;
