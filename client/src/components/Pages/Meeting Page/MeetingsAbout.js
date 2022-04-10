import React from "react";
import Footer from "../Footer";

function MeetingsAbout(props) {
  return (
    <>
      <div className="about-container-header">
        <h1>Still need help?</h1>
        <h4>
          Meet with the community's advisors and discuss any concerns on your
          mind!
        </h4>
      </div>
      <div className="about-container-body">
        <div className="about-container-body-text">
          <h3>Get the advice you need from familiar faces:</h3>
          <ul>
            <li>Seek guidance from SMU's experts and professors.</li>
            <li>Chat with Junior, Senior, Final and Former students.</li>
            <li>Get an idea about the courses you are going to encounter.</li>
            <li>Find answers to seemingly difficult questions and thoughts.</li>
          </ul>
        </div>
        <div className="about-container-body-img"></div>
      </div>
      <div className="about-container-body">
        <div className="about-container-body-img" id="second"></div>
        <div className="about-container-body-text">
          <h3>How can I request a meeting?</h3>
          <div className="about-container-body-steps">
            <p>
              <strong>
                <u>Step 1:</u>
              </strong>
              <br />
              Check out the current meetings schedule
            </p>
            <p>
              <strong>
                <u>Step 2:</u>
              </strong>
              <br />
              Choose which available meeting you would like to request
            </p>
            <p>
              <strong>
                <u>Step 3:</u>
              </strong>
              <br />
              We inform the advisor about your request by email
            </p>
            <p>
              <strong>
                <u>Step 4:</u>
              </strong>
              <br />
              Sit & Relax! The advisor should reach out to you soon
            </p>
          </div>
        </div>
      </div>
      <div className="about-container-end">
        <button
          onClick={() => {
            window.location.href = "/meetings/request";
          }}
        >
          MEETINGS SCHEDULE
        </button>
        <button
          onClick={() => {
            window.location.href = "/meetings/advisors";
          }}
        >
          THE ADVISORS
        </button>
      </div>
      <Footer />
    </>
  );
}

export default MeetingsAbout;
