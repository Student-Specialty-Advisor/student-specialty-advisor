import React from "react";
import Footer from "../Footer";

function MeetingsAbout(props) {
  return (
    <>
      <div className="about-container-test">
        <h1>What are the meetings that you can book</h1>
      </div>
      <div className="about-container">
        <h1>What are Meetings?</h1>
        <h4>
          In this page students will find the description of this feature and
          how to use it
        </h4>
        <h3> The use of this feature </h3>
        <li>talk to professors about the programs</li>
        <li>schedule a Meeting with a PASS leader </li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <div className="about-container-img"></div>
      </div>
      <div className="about-container-mid">
        <h3> When to schedule a meeting</h3>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <h3> What is the outcome of using this feature?</h3>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit.</li>
        <li>Lorem ipsum dolor sit amet.</li>

        <h3>Students may find the list of the advisors here </h3>
        <button
          className="about-container-mid-button"
          onClick={() => {
            props.history.push("/meetings/advisors");
          }}
        >
          Advisors List
        </button>
      </div>
      <div className="about-container-bottom">
        <h3>Students may requset a meeting here </h3>
        <button
          className="about-container-bottom-button"
          onClick={() => {
            props.history.push("/meetings/request");
          }}
        >
          REQUEST A MEETING!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default MeetingsAbout;
