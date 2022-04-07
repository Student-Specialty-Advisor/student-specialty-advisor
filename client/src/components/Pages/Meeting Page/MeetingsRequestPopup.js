import React from "react";

function MeetingsRequestPopup(props) {
  const [topic, setTopic] = React.useState("Topic I");

  const handleSelectChange = (event) => {
    setTopic(event.target.value);
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
        <button>{"Do it!"}</button>
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
