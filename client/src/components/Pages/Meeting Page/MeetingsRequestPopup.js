import alertify from "alertifyjs";
import React from "react";
import AuthService from "../../../services/AuthService";
import fetchService from "../../../services/fetchService";

function MeetingsRequestPopup(props) {
  const [topic, setTopic] = React.useState("Topic I");

  const handleSelectChange = (event) => {
    setTopic(event.target.value);
  };

  const currentUser = AuthService.getCurrentUser();

  const sendRequest = () => {
    document.getElementById("request-button").disabled = true;
    const data = {
      meetingID: props.info.meetingID,
      to: props.info.email,
      day: props.info.day,
      from: props.info.from,
      userName: currentUser.firstName + " " + currentUser.lastName,
      userEmail: currentUser.email,
      universityYear: currentUser.universityYear,
      reason: topic,
    };
    fetchService
      .doPUT("meeting/request", data)
      .then((response) => {
        console.log(response);
        if (response.tokenError) {
          AuthService.alertifyInvalidToken();
          return;
        }
        if (response.success) {
          alertify.success(
            "Your request was sent, and we just informed the advisor!",
            5
          );
          alertify.message(
            "Tip: Don't hesitate to reach out to the advisor by email!",
            7
          );
        } else if (response.unavailable) {
          alertify.warning(
            "Hm.. Unfortunately, this meeting just got reserved by someone else!"
          );
        } else {
          alertify.error(
            "It seems we have issues processing your request.. Try again later :("
          );
        }
        props.setIsShown(false);
        props.fetchSchedule();
      })
      .catch((error) => {
        console.log(error);
        alertify.error(
          "It seems we have issues processing your request.. Try again later :("
        );
        props.setIsShown(false);
        props.fetchSchedule();
      });
  };

  const intro = (
    <>
      <h3>
        What do you need {props.info.name.split(" ")[0]} to help you with?
      </h3>
      <select onChange={handleSelectChange}>
        <option value="Topic I">Topic I</option>
        <option value="Topic II">Topic II</option>
        <option value="Topic III">Topic III</option>
      </select>
      <div>
        <button onClick={() => props.setShowNext(true)}>{"Next >"}</button>
      </div>
    </>
  );
  const confirmation = (
    <>
      <p style={{ marginTop: "2.5%" }}>
        You are about to request a meeting with
        <strong> {props.info.name}</strong>, an advisor for the
        <strong> {props.info.specialty} specialty</strong> to discuss
        <strong> {topic}</strong>.
      </p>
      <p>
        <strong>Would you like to confirm this request?</strong>
      </p>
      <div>
        <button onClick={() => props.setShowNext(false)}>{"< Back"}</button>
        <button id="request-button" onClick={sendRequest}>
          {"Do it!"}
        </button>
      </div>
    </>
  );

  return props.isShown ? (
    props.info.col > 3 ? (
      <div id="meetings-request-popup" className="forRight">
        {!props.showNext ? intro : confirmation}
      </div>
    ) : (
      <div id="meetings-request-popup" className="forLeft">
        {!props.showNext ? intro : confirmation}
      </div>
    )
  ) : (
    <div id="meetings-request-popup"></div>
  );
}

export default MeetingsRequestPopup;
