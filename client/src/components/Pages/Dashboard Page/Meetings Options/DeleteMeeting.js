import React from "react";
import alertify from "alertifyjs";
import fetchService from "../../../../services/fetchService";
function DeleteMeeting(props) {
  const task = () => {
    fetchService
      .doDelete("meeting/schedule/" + select.current.value)
      .then((response) => {
        if (response.success) {
          alertify.success("Meeting was deleted Successfully");
          props.setMeetingsList();
        } else {
          alertify.error(
            "Please try later , an error has occurred while deleting the meeting"
          );
        }
      })
      .catch(() => {
        alertify.error(
          "Please try later , an error has occurred while deleting the meeting"
        );
      });
  };
  const select = React.useRef();
  const timeSuffix = (number) => {
    switch (number) {
      case "8":
        return "am";
      case "9":
        return "am";
      case "10":
        return "am";
      case "11":
        return "am";
      case "12":
        return "am";
      case "1":
        return "pm";
      case "2":
        return "pm";
      case "3":
        return "pm";
      case "4":
        return "pm";
      default:
        return "pm";
    }
  };
  const mappingOverMeetings = props.meetingsList.meetings.map((meeting) => {
    return (
      <option key={meeting._id} value={meeting._id}>
        {meeting.advisor.fullName +
          ", " +
          meeting.day +
          ", " +
          meeting.from +
          " " +
          timeSuffix(meeting.from)}
      </option>
    );
  });

  return (
    <>
      <h1>Delete A Meeting</h1>
      {props.meetingsList.meetings.length === 0 ? (
        <p>
          <strong> There are no meetings in the database yet.</strong>
        </p>
      ) : (
        <>
          <select ref={select}>{mappingOverMeetings}</select>
          <button onClick={task}>Submit</button>
        </>
      )}
    </>
  );
}

export default DeleteMeeting;
