import Footer from "../Footer";
import { NavLink, Redirect, useParams } from "react-router-dom";
import React from "react";
import AuthService from "../../../services/AuthService";
import alertify from "alertifyjs";
import VideoContainer from "./VideoContainer";
import fetchService from "../../../services/fetchService";
import { completeAchievement } from "../../../services/achievements";

const SPECIALTIES = ["se", "cse", "re"];

function VideosList(props) {
  let { specialty } = useParams();
  let easterEggCounter = 0;
  let easterEggTimer;
  React.useEffect(() => {
    document.title =
      specialty.toUpperCase() + " - Videos - Student Specialty Advisor";
  }, [specialty]);

  const [videosSE, setVideosSE] = React.useState([]);
  const [videosCSE, setVideosCSE] = React.useState([]);
  const [videosRE, setVideosRE] = React.useState([]);

  const fetchAll = async () => {
    const listSE = await fetchService.doGET("videos/SE");
    const listCSE = await fetchService.doGET("videos/CSE");
    const listRE = await fetchService.doGET("videos/REE");
    setVideosSE(listSE);
    setVideosCSE(listCSE);
    setVideosRE(listRE);
  };

  const [initialHTML] = React.useState(
    "Buckle up &<br/>Get <strong>your popcorn</strong> ready!"
  );

  const setupList = () => {
    // Here change the <li> elements by VideoContainer elements to be displayed.
    // Take into consideration <li>, props.key, props.id, props.className when implementing VideoContainer.
    if (specialty === "se") {
      const list = videosSE.map((video) => {
        return <VideoContainer key={video.link} code={video.link} />;
      });
      return (
        <>
          {list}
          <div className="to-be-continued"></div>
        </>
      );
    } else if (specialty === "cse") {
      const list = videosCSE.map((video) => {
        return <VideoContainer key={video.link} code={video.link} />;
      });
      return (
        <>
          {list}
          <div className="to-be-continued"></div>
        </>
      );
    } else if (specialty === "re") {
      const list = videosRE.map((video) => {
        return <VideoContainer key={video.link} code={video.link} />;
      });
      return (
        <>
          {list}
          <div className="to-be-continued"></div>
        </>
      );
    }
  };

  const showVideosList = setupList();

  const setupSideBar = () => {
    var se = document.getElementById("se");
    var cse = document.getElementById("cse");
    var re = document.getElementById("re");
    switch (specialty) {
      case "se":
        se.className = "active";
        cse.className = "";
        re.className = "";
        break;
      case "cse":
        se.className = "";
        cse.className = "active";
        re.className = "";
        break;
      case "re":
        se.className = "";
        cse.className = "";
        re.className = "active";
        break;
      default:
        break;
    }
  };

  const easterEgg = () => {
    if (easterEggCounter < 12) {
      document.getElementById("popcorn-text").innerHTML =
        "No! that's <strong>my popcorn</strong>!<br/>Go get yours!";
    } else if (easterEggCounter < 25) {
      document.getElementById("popcorn-text").innerHTML =
        "I already told you <strong> this is mine</strong>! Please stop!";
    } else if (easterEggCounter < 40) {
      document.getElementById("popcorn-text").innerHTML =
        "You really need to relax! It's <strong>my popcorn</strong>!!!";
    } else if (easterEggCounter < 55) {
      document.getElementById("popcorn-text").innerHTML =
        "Dude it's just <strong>my popcorn</strong>, nothing personal. Why do you have to be mad?";
    } else if (easterEggCounter < 80) {
      document.getElementById("popcorn-text").innerHTML =
        "This is getting really awkward now..";
    } else if (easterEggCounter < 120) {
      document.getElementById("popcorn-text").innerHTML =
        "<strong>STOP.STOP.STOP.STOP.<br/>STOP.STOP.STOP.STOP.</strong>";
    } else if (easterEggCounter < 160) {
      document.getElementById("popcorn-text").innerHTML =
        "I don't have to deal with this!";
      document.getElementById("popcorn-image").classList.add("popcorn-done");
      alertify
        .alert(
          "Your session expired because you tried to steal <strong>someone else's popcorn</strong>. Please login again to continue!",
          () => {
            AuthService.logout();
            window.location.href = "/login";
          }
        )
        .set("closable", false);
      clearTimeout(easterEggTimer);
      return;
    }
    clearTimeout(easterEggTimer);
    easterEggTimer = setTimeout(() => {
      try {
        document.getElementById("popcorn-text").innerHTML = initialHTML;
        easterEggCounter = 0;
      } catch {
        return;
      }
    }, 500);
    easterEggCounter = easterEggCounter + 1;
  };

  React.useEffect(() => {
    fetchAll();
  }, []);

  React.useEffect(() => {
    let achievementTimer = setTimeout(
      () => completeAchievement("videosCompletion", "Browsing videos"),
      60000
    );
    return () => {
      clearTimeout(achievementTimer);
    };
  }, []);

  React.useEffect(setupSideBar);

  return SPECIALTIES.includes(specialty) ? (
    <>
      <div className="videos-container">
        <ul className="side-bar">
          <li id="se">
            <NavLink to="/videos/se" text="Software Engineering">
              Software Engineering
            </NavLink>
          </li>
          <li id="cse">
            <NavLink to="/videos/cse" text="Computer Systems Engineering">
              Computer Systems Engineering
            </NavLink>
          </li>
          <li id="re">
            <NavLink to="/videos/re" text="Renewable Energy Engineering">
              Renewable Energy Engineering
            </NavLink>
          </li>
          <div className="popcorn">
            <div id="popcorn-image" onClick={easterEgg}></div>
            <p id="popcorn-text">
              Buckle up &<br />
              Get <strong>your popcorn</strong> ready!
            </p>
          </div>
        </ul>
        <ul className="videos-list">{showVideosList}</ul>
      </div>
      <Footer id="no-margin" />
    </>
  ) : (
    <Redirect to="/videos/se" />
  );
}

export default VideosList;
