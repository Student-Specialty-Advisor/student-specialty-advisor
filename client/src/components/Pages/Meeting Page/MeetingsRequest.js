import React from "react";
import fetchService from "../../../services/fetchService";
import AuthService from "../../../services/AuthService";
import alertify from "alertifyjs";
function MeetingsRequest() {
  React.useEffect(() => {
    document.title = "Meetings - Schedule - Student Specialty Advisor";
  }, []);
  //only for testing
  const data = {
    to: "studentspecialtyadvisor@gmail.com",
    subject: "youssef is testing from frontend",
    html:
      "<h1 style = 'color : blue ; margin : auto ; '>hello world from " +
      AuthService.getCurrentUser().firstName +
      "!</h1>",
  };
  //just plug this function along side your work
  const task = async () => {
    const json = await fetchService.doPOST("meeting/request", data);
    console.log(json);
    if (json.error) {
      alertify.error("error while sending email !");
    } else if (json.message) {
      alertify.success("Email was sent successfully!");
    }
  };
  return (
    <div>
      <h1>You can request meetings and view advisors here</h1>
      <h1>You can request meetings and view advisors here</h1>
      <h1>You can request meetings and view advisors here</h1>
      <h1>You can request meetings and view advisors here</h1>
      <h1>You can request meetings and view advisors here</h1>
      <button disabled="true" onClick={task}>
        Send test email (disabled to avoid spam)
      </button>
    </div>
  );
}

export default MeetingsRequest;
