import React from "react";
import fetchService from "../../../../services/fetchService.js";
import alertify from "alertifyjs";
import {
  StyledMenuItem,
  StyledTextField,
  StyledButton,
} from "../../../Basic Elements/StyledBasicElements.js";
function AddMeeting(props) {
  const [day, setDay] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [advisor, setAdvisor] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  const task = () => {
    const data = {
      day: day,
      from: from,
      advisor: advisor,
      isAvailable: true,
    };
    fetchService
      .doPOST("meeting/schedule", data)
      .then((response) => {
        if (response.success) {
          alertify.success("Meeting was added Successfully");
          props.setMeetingsList();
          props.refresh();
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
      <StyledMenuItem key={advisor._id} value={advisor._id}>
        {advisor.fullName}
      </StyledMenuItem>
    );
  });

  React.useEffect(() => {
    if (day !== "" && from !== "" && advisor !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [day, from, advisor]);

  return (
    <>
      <StyledTextField
        select
        size="small"
        label="Day"
        value={day}
        onChange={(event) => {
          setDay(event.target.value);
        }}
        variant="outlined"
        margin="dense"
        sx={{ width: 225 }}
        helperText="Please select the meeting day"
      >
        <StyledMenuItem value="Monday">Monday</StyledMenuItem>
        <StyledMenuItem value="Tuesday">Tuesday</StyledMenuItem>
        <StyledMenuItem value="Wednesday">Wednesday</StyledMenuItem>
        <StyledMenuItem value="Thursday">Thursday</StyledMenuItem>
        <StyledMenuItem value="Friday">Friday</StyledMenuItem>
        <StyledMenuItem value="Saturday">Saturday</StyledMenuItem>
      </StyledTextField>
      <br />
      <StyledTextField
        select
        size="small"
        label="From"
        value={from}
        onChange={(event) => {
          setFrom(event.target.value);
        }}
        variant="outlined"
        margin="dense"
        sx={{ width: 225 }}
        helperText="Please select the meeting time"
      >
        <StyledMenuItem value="8">8:00 am</StyledMenuItem>
        <StyledMenuItem value="9">9:00 am</StyledMenuItem>
        <StyledMenuItem value="10">10:00 am</StyledMenuItem>
        <StyledMenuItem value="11">11:00 am</StyledMenuItem>
        <StyledMenuItem value="12">12:00 pm</StyledMenuItem>
        <StyledMenuItem value="1">1:00 pm</StyledMenuItem>
        <StyledMenuItem value="2">2:00 pm</StyledMenuItem>
        <StyledMenuItem value="3">3:00 pm</StyledMenuItem>
        <StyledMenuItem value="4">4:00 pm</StyledMenuItem>
      </StyledTextField>
      <br />
      <StyledTextField
        select
        size="small"
        label="Advisor"
        value={advisor}
        onChange={(event) => {
          setAdvisor(event.target.value);
        }}
        variant="outlined"
        margin="dense"
        sx={{ width: 225 }}
        helperText="Please select the advisor"
      >
        {mapping}
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
  );
}

export default AddMeeting;
