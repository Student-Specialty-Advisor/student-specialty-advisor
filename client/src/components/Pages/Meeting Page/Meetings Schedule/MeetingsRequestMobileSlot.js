import React from "react";
import {
  StyledButton,
  StyledTextField,
  StyledMenuItem,
} from "../../../Basic Elements/StyledBasicElements";
import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import AuthService from "../../../../services/AuthService";
import { completeAchievement } from "../../../../services/achievements";
import fetchService from "../../../../services/fetchService";
import alertify from "alertifyjs";

function MeetingsRequestMobileSlot(props) {
  const [step, setStep] = React.useState(0);
  const [topic, setTopic] = React.useState("");
  const [allowNext, setAllowNext] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const previousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handleTopicChange = (event) => {
    setTopic(event.target.value);
    if (allowNext === false) {
      setAllowNext(true);
    }
  };
  const sendRequest = () => {
    var currentUser = AuthService.getCurrentUser();
    setConfirmed(true);
    document.getElementById("confirm-button").disabled = true;
    const data = {
      meetingID: props.element._id,
      to: props.element.email,
      day: props.element.day,
      from: props.element.from,
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
          completeAchievement("meetingsRequestCompletion", "Request a Meeting");
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
        props.fetchSchedule();
      })
      .catch((error) => {
        alertify.error(
          "It seems we have issues processing your request.. Try again later :("
        );
        props.setIsShown(false);
        props.fetchSchedule();
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
  return (
    <div>
      <Paper className="meetings-request-mobile-element" elevation={0}>
        {step === 0 && (
          <>
            <Typography textAlign="center" variant="p" margin="1.5%">
              {props.element.advisor.fullName},{" "}
              {props.element.advisor.profession}
            </Typography>
            <Typography textAlign="center" variant="p" margin="1%">
              Advisor for {props.element.advisor.specialty}
            </Typography>
            <Typography textAlign="center" variant="p" margin="1%">
              Meeting starts{" "}
              {props.element.from + ":00 " + timeSuffix(props.element.from)}
            </Typography>
            {props.element.isAvailable ? (
              <StyledButton
                key="request-meeting-button"
                onClick={nextStep}
                variant="contained"
                sx={{ marginTop: "2%", marginBottom: "1%", minWidth: "25%" }}
              >
                Request Meeting
              </StyledButton>
            ) : (
              <StyledButton
                key="request-meeting-button"
                variant="contained"
                disabled
                sx={{ marginTop: "2%", marginBottom: "1%", minWidth: "25%" }}
              >
                {props.element.passed ? "Unavailable" : "Reserved"}
              </StyledButton>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <Typography textAlign="center" variant="p" margin="1.5%">
              What do you need {props.element.advisor.fullName.split(" ")[0]} to
              help you with?
            </Typography>
            <StyledTextField
              select
              size="small"
              label="Topic"
              variant="outlined"
              margin="normal"
              sx={{ width: "90%" }}
              value={topic}
              onChange={handleTopicChange}
            >
              <StyledMenuItem
                value={`The switch from another specialty to ${props.element.advisor.specialty}`}
              >{`The switch from another specialty to ${props.element.advisor.specialty}`}</StyledMenuItem>
              <StyledMenuItem
                value={`The reasons to choose ${props.element.advisor.specialty}`}
              >
                {`The reasons to choose ${props.element.advisor.specialty}`}
              </StyledMenuItem>
              <StyledMenuItem
                value={`Other concerns & questions about ${props.element.advisor.specialty}`}
              >{`Other concerns & questions about ${props.element.advisor.specialty}`}</StyledMenuItem>
            </StyledTextField>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "2%",
                marginTop: "2%",
              }}
            >
              <Button
                key="back-to-request-button"
                variant="contained"
                onClick={previousStep}
              >
                Back
              </Button>
              <StyledButton
                key="next-to-confirm-button"
                variant="contained"
                onClick={nextStep}
                disabled={!allowNext}
              >
                Next
              </StyledButton>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <Typography textAlign="center" variant="p" margin="1.5%">
              You are about to request a meeting with
              <strong> {props.element.advisor.fullName}</strong>, an advisor for
              the
              <strong> {props.element.advisor.specialty} specialty</strong> to
              discuss
              <strong> {topic}</strong>.
            </Typography>
            <Typography textAlign="center" variant="p" margin="2%">
              Would you like to confirm this request?
            </Typography>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "2%",
                marginTop: "2%",
              }}
            >
              <Button
                key="back-to-next-button"
                variant="contained"
                onClick={previousStep}
              >
                Back
              </Button>
              <StyledButton
                key="confirm-button"
                id="confirm-button"
                variant="contained"
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
        )}
      </Paper>
      <Divider sx={{ bgcolor: "var(--myblue)", width: "100%" }} />
    </div>
  );
}

export default MeetingsRequestMobileSlot;
