import { Redirect } from "react-router-dom";
import AuthService from "../../services/AuthService";
import alertify from "alertifyjs";
import React from "react";
import {
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Button,
} from "@mui/material";
import {
  StyledButton,
  StyledMenuItem,
  StyledStepper,
  StyledTextField,
} from "../Basic Elements/StyledBasicElements";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function SignUpForm(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [yearValue, setYearValue] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [continueDisabled, setContinueDisabled] = React.useState(true);
  const [signUpDisabled, setSignUpDisabled] = React.useState(true);
  const [notMatching, setNotMatching] = React.useState(false);
  const [invalidEmail, setInvalidEmail] = React.useState(false);

  const steps = ["Fill in your information", "Fill in your credentials "];
  const loginPagePath = "/login";
  const isLoggedIn = AuthService.isLoggedIn();

  React.useEffect(() => {
    document.title = "Sign Up - Student Specialty Advisor";
  }, []);

  const handleNext = () => {
    if (activeStep === 0) {
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFirstStep = () => {
    if (firstName === "" || lastName === "" || yearValue === "") {
      setContinueDisabled(true);
    } else {
      setContinueDisabled(false);
    }
  };

  const handlePassword = () => {
    if (password === "" || password2 === "") {
      setNotMatching(false);
    } else {
      if (password !== password2) {
        setNotMatching(true);
      } else {
        setNotMatching(false);
      }
    }
  };

  const handleEmail = () => {
    if (email !== "") {
      if (
        email.split("@")[1] === "medtech.tn" ||
        email.split("@")[1] === "smu.tn"
      ) {
        setInvalidEmail(false);
      } else {
        setInvalidEmail(true);
      }
    } else {
      setInvalidEmail(false);
    }
  };

  const handleSecondStep = () => {
    if (notMatching === true || invalidEmail === true) {
      setSignUpDisabled(true);
    } else if (email === "" || password === "" || password2 === "") {
      setSignUpDisabled(true);
    } else {
      setSignUpDisabled(false);
    }
  };

  const task = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page on button click
    var data = {
      firstName: firstName,
      lastName: lastName,
      universityYear: yearValue,
      email: email,
      password: password,
    };
    AuthService.register(data)
      .then((response) => {
        if (response.keyPattern) {
          alertify.error(
            "Seems like this email is already used by another account!"
          );
        } else {
          handleNext();
        }
      })
      .catch((error) => {
        console.log(error);
        alertify.error(
          "Something went wrong when creating the account. Please try again later."
        );
      });
  };

  const getBackgroundImage = () => {
    var images = ["image1", "image2", "image3"];
    var image = images[Math.floor(Math.random() * images.length)];
    document.getElementById("background-image").classList.add(image);
  };

  React.useEffect(getBackgroundImage, []);

  React.useEffect(handleFirstStep, [firstName, lastName, yearValue]);

  React.useEffect(handlePassword, [password, password2]);

  React.useEffect(handleEmail, [email]);

  React.useEffect(handleSecondStep, [
    notMatching,
    invalidEmail,
    email,
    password,
    password2,
  ]);

  const Form = (
    <div className="sign-up-background">
      <div className="form-image-container" id="background-image"></div>
      <div className="form-container">
        <form id="signUpForm">
          <div
            className="logo"
            onClick={() => {
              window.location.href = "/";
            }}
          ></div>
          <h3>Sign Up</h3>
          <StyledStepper
            sx={{ width: "100%" }}
            activeStep={activeStep}
            orientation="vertical"
          >
            <Step key={steps[0]}>
              <StepButton
                onClick={() => {
                  setActiveStep(0);
                }}
              >
                {steps[0]}
              </StepButton>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  placeholder="E.g: Aymen"
                  margin="dense"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  label="Last Name"
                  placeholder="E.g: Hammami"
                  margin="dense"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
                <StyledTextField
                  select
                  fullWidth
                  variant="outlined"
                  label="University Year"
                  margin="dense"
                  value={yearValue}
                  onChange={(event) => {
                    setYearValue(event.target.value);
                  }}
                >
                  <StyledMenuItem value="Freshman">
                    Freshman year
                  </StyledMenuItem>
                  <StyledMenuItem value="Sophomore">
                    Sophomore year
                  </StyledMenuItem>
                  <StyledMenuItem value="Junior">Junior year</StyledMenuItem>
                  <StyledMenuItem value="Senior">Senior year</StyledMenuItem>
                  <StyledMenuItem value="Final">Final year</StyledMenuItem>
                </StyledTextField>
                <StyledButton
                  sx={{ marginTop: "2%" }}
                  size="large"
                  variant="contained"
                  onClick={handleNext}
                  disabled={continueDisabled}
                >
                  Continue
                </StyledButton>
              </StepContent>
            </Step>
            <Step key={steps[1]}>
              <StepLabel>{steps[1]}</StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  placeholder="E.g: aymen.hammami@medtech.tn"
                  margin="dense"
                  value={email}
                  error={invalidEmail}
                  helperText={
                    invalidEmail
                      ? "Email should end with @medtech.tn or @smu.tn"
                      : ""
                  }
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  placeholder="E.g: aymen123-"
                  margin="dense"
                  type="password"
                  value={password}
                  error={notMatching}
                  helperText={notMatching ? "Fields are not matching." : ""}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <StyledTextField
                  fullWidth
                  variant="outlined"
                  label="Repeat Password"
                  margin="dense"
                  type="password"
                  value={password2}
                  error={notMatching}
                  helperText={notMatching ? "Fields are not matching." : ""}
                  onChange={(event) => {
                    setPassword2(event.target.value);
                  }}
                />
                <StyledButton
                  sx={{ marginTop: "2%" }}
                  size="large"
                  variant="contained"
                  onClick={task}
                  disabled={signUpDisabled}
                >
                  Sign Up
                </StyledButton>
                <Button
                  sx={{
                    marginTop: "2%",
                    marginLeft: "2%",
                  }}
                  size="large"
                  variant="contained"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </StepContent>
            </Step>
          </StyledStepper>
          {activeStep === 2 ? (
            <div
              style={{
                marginTop: "10%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <CheckCircleIcon fontSize="large" sx={{ color: "#1976d2" }} />
              <p>
                Signing up was successful!
                <br />
                We sent you a verification email. Check it out!
              </p>
              <StyledButton
                variant="contained"
                sx={{ width: "50%" }}
                onClick={() => {
                  props.history.push(loginPagePath);
                }}
              >
                Continue to Login
              </StyledButton>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );

  return isLoggedIn ? <Redirect to="/login" /> : <div>{Form}</div>;
}

export default SignUpForm;
