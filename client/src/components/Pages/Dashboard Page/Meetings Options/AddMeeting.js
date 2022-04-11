import React from "react";
import fetchService from "../../../../services/fetchService.js";
import alertify from "alertifyjs";
function AddMeeting(props) {
  const day = React.useRef();
  const from = React.useRef();
  const advisor = React.useRef();

  const task = () => {
    const data = {
      day: day.current.value,
      from: from.current.value,
      advisor: advisor.current.value,
      isAvailable: true,
    };
    fetchService
      .doPOST("meeting/schedule", data)
      .then((response) => {
        if (response.success) {
          alertify.success("Meeting was added Successfully");
        } else {
          alertify.warning("This meeting's time slot already exists ");
        }
      })
      .catch(() => {
        alertify.error(
          "Please try later , an error has occurred while posting the meeting"
        );
      });
  };

  const mapping = props.advisorsList.map((advisor) => {
    return (
      <option key={advisor._id} value={advisor._id}>
        {advisor.fullName}
      </option>
    );
  });
  return (
    <>
      <h1>Add A Meeting :</h1>
      <label>Day : </label>
      <br />
      <select ref={day}>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
      </select>
      <br />
      <label>From</label>
      <br />
      <select ref={from}>
        <option value="8">8:00 am</option>
        <option value="9">9:00 am</option>
        <option value="10">10:00 am</option>
        <option value="11">11:00 am</option>
        <option value="12">12:00 pm</option>
        <option value="1">1:00 pm</option>
        <option value="2">2:00 pm</option>
        <option value="3">3:00 pm</option>
        <option value="4">4:00 pm</option>
      </select>
      <br />
      <label>Advisor : </label>
      <br />
      <select ref={advisor}>{mapping}</select>
      <br />
      <button onClick={task}>Submit</button>
    </>
  );
}

export default AddMeeting;
