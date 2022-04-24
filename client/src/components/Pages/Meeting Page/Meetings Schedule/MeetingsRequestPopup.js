import { CircularProgress, Typography } from "@mui/material";
import alertify from "alertifyjs";
import React from "react";
import { completeAchievement } from "../../../../services/achievements";
import AuthService from "../../../../services/AuthService";
import fetchService from "../../../../services/fetchService";
import {
  StyledButton,
  StyledMenuItem,
  StyledTextField,
} from "../../../Basic Elements/StyledBasicElements";

function MeetingsRequestPopup(props) {
  const [topic, setTopic] = React.useState("");
  const [allowNext, setAllowNext] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  const handleSelectChange = (event) => {
    setTopic(event.target.value);
    if (allowNext === false) {
      setAllowNext(true);
    }
  };

  const currentUser = AuthService.getCurrentUser();

  const sendRequest = () => {
    setConfirmed(true);
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
        if (response.tokenError) {
          AuthService.alertifyInvalidToken();
          return;
        }
        if (response.success) {
          alertify.success(
            "Your request was sent, and we just informed the advisor!"
          );
          completeAchievement("meetingsRequestCompletion", "Meeting Request");
        } else if (response.unavailable) {
          alertify.warning(
            "Hm.. Unfortunately, this meeting just got reserved by someone else!"
          );
        } else {
          alertify.error(
            "It seems we have issues processing your request.. Try again later :("
          );
        }
        setConfirmed(false);
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
      <Typography variant="h3" fontWeight="bold">
        What do you need {props.info.name.split(" ")[0]} to help you with?
      </Typography>
      <StyledTextField
        select
        size="small"
        label="Topic"
        variant="outlined"
        margin="normal"
        sx={{ width: "80%" }}
        value={topic}
        onChange={handleSelectChange}
      >
        <StyledMenuItem
          value={`The switch from another specialty to ${props.info.specialty}`}
        >{`The switch from another specialty to ${props.info.specialty}`}</StyledMenuItem>
        <StyledMenuItem value={`The reasons to choose ${props.info.specialty}`}>
          {`The reasons to choose ${props.info.specialty}`}
        </StyledMenuItem>
        <StyledMenuItem
          value={`Other concerns & questions about ${props.info.specialty}`}
        >{`Other concerns & questions about ${props.info.specialty}`}</StyledMenuItem>
      </StyledTextField>
      <div className="buttons-container">
        <StyledButton
          key="next-button"
          variant="contained"
          sx={{ backgroundColor: "white !important", fontSize: "0.8rem" }}
          onClick={() => props.setShowNext(true)}
          disabled={!allowNext}
        >
          Next
        </StyledButton>
      </div>
    </>
  );
  const confirmation = (
    <>
      <Typography
        textAlign="center"
        variant="p"
        marginTop="5%"
        marginLeft="5%"
        marginRight="5%"
      >
        You are about to request a meeting with
        <strong> {props.info.name}</strong>, an advisor for the
        <strong> {props.info.specialty} specialty</strong> to discuss
        <strong> {topic}</strong>.
      </Typography>
      <Typography
        variant="p"
        textAlign="center"
        marginTop="2.5%"
        marginLeft="5%"
        marginRight="5%"
      >
        <strong>Would you like to confirm this request?</strong>
      </Typography>
      <div className="buttons-container">
        <StyledButton
          key="back-button"
          variant="contained"
          sx={{ backgroundColor: "white !important", fontSize: "0.8rem" }}
          onClick={() => props.setShowNext(false)}
        >
          Back
        </StyledButton>
        <StyledButton
          sx={{ backgroundColor: "lightgreen !important", fontSize: "0.8rem" }}
          variant="contained"
          id="request-button"
          onClick={sendRequest}
        >
          {confirmed ? (
            <CircularProgress
              disableShrink
              color="success"
              thickness={5}
              size={20}
            />
          ) : (
            "Confirm"
          )}
        </StyledButton>
      </div>
    </>
  );

  const { reset, setReset } = props;

  React.useEffect(() => {
    if (reset === true) {
      setTopic("");
      setAllowNext(false);
      setReset(false);
    }
  }, [reset, setReset]);

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
