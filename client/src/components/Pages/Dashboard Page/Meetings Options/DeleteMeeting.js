import React from "react";
import alertify from "alertifyjs";
import fetchService from "../../../../services/fetchService";
import {
  StyledMenuItem,
  StyledButton,
  StyledTextField,
} from "../../../Basic Elements/StyledBasicElements";
function DeleteMeeting(props) {
  const [select, setSelect] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleSelectChange = (event) => {
    setSelect(event.target.value);
    if (isDisabled === true) {
      setIsDisabled(false);
    }
  };

  const task = () => {
    fetchService
      .doDelete("meeting/schedule/" + select)
      .then((response) => {
        if (response.success) {
          alertify.success("Meeting was deleted Successfully");
          props.setMeetingsList();
          props.refresh();
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
  const mappingOverMeetings = props.meetingsList.meetings
    .sort((a, b) => {
      const nameA = a.advisor.fullName.toUpperCase();
      const nameB = b.advisor.fullName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })
    .map((meeting) => {
      return (
        <StyledMenuItem key={meeting._id} value={meeting._id}>
          {meeting.advisor.fullName +
            ", " +
            meeting.day +
            ", " +
            meeting.from +
            " " +
            timeSuffix(meeting.from)}
        </StyledMenuItem>
      );
    });

  return (
    <>
      {props.meetingsList.meetings.length === 0 ? (
        <p>
          <strong> There are no meetings in the database yet.</strong>
        </p>
      ) : (
        <>
          <StyledTextField
            select
            size="small"
            label="Meeting"
            value={select}
            onChange={handleSelectChange}
            variant="outlined"
            margin="dense"
            sx={{ width: 225 }}
            helperText="Please select a meeting to delete"
          >
            {mappingOverMeetings}
          </StyledTextField>
          <br />
          <StyledButton
            sx={{ marginTop: "1%" }}
            variant="contained"
            onClick={task}
            disabled={isDisabled}
          >
            Submit
          </StyledButton>
        </>
      )}
    </>
  );
}

export default DeleteMeeting;
