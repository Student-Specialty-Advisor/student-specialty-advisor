import utils from "../utils";
import AuthService from "../../services/AuthService";
import React from "react";
import alertify from "alertifyjs";
import {
  StyledTextField,
  StyledButton,
} from "../Basic Elements/StyledBasicElements";

function LogInForm(props) {
  React.useEffect(() => {
    document.title = "Login - Student Specialty Advisor";
  }, []);

  const defaultRedirectPath = "/";

  const isLoggedIn = AuthService.isLoggedIn();

  const getFormData = () => {
    var form = document.getElementById("signInForm").elements;
    var email = utils.check(form["iEmail"].value);
    if (email === null) return utils.invalidEmail;
    if (!utils.isValidEmail(email)) return utils.invalidEmail;
    var password = utils.check(form["iPassword"].value);
    if (password === null) return utils.invalidPassword;
    const formDataHolder = {
      email: email,
      password: password,
    };

    return formDataHolder; // If all values are there, create an object with them and return it
  };

  const task = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page on button click
    var data = getFormData();
    if (data === utils.invalidEmail) {
      alertify.warning("Make sure to enter a valid SMU / MEDTECH e-mail!");
    } else if (data === utils.invalidPassword) {
      alertify.warning("Hey! No password was given!");
    } else {
      AuthService.login(data).then((response) => {
        if (response.keyPattern) {
          alertify.error(
            "Invalid Credentials..   Make sure you have written your e-mail and password correctly!"
          );
        } else if (response.notVerified) {
          alertify.warning(
            "You need to verify your email before you can access your account!"
          );
        } else {
          try {
            var customRedirectPath = props.location.state.from.pathname;
          } catch (error) {
            window.location.href = defaultRedirectPath;
            return;
          }
          window.location.href = customRedirectPath;
          return;
        }
      });
    }
  };

  const getBackgroundImage = () => {
    var images = ["image1", "image2", "image3"];
    var image = images[Math.floor(Math.random() * images.length)];
    document.getElementById("background-image").classList.add(image);
  };

  React.useEffect(getBackgroundImage, []);

  const AlreadyLoggedIn = () => {
    const logout = () => {
      AuthService.logout();
      window.location.href = "/login";
    };
    const cancel = () => {
      window.location.href = defaultRedirectPath;
    };
    var user =
      AuthService.getCurrentUser().firstName +
      " " +
      AuthService.getCurrentUser().lastName;
    return (
      <>
        <p className="already-logged-in-text">
          You are already logged in as <strong>{user}</strong>.
          <br />
          You need to logout if you wish to use another account!
        </p>
        <StyledButton
          sx={{ marginTop: "4%" }}
          size="large"
          fullWidth
          variant="contained"
          onClick={logout}
        >
          LOG OUT
        </StyledButton>
        <StyledButton
          sx={{ marginTop: "4%" }}
          size="large"
          fullWidth
          variant="contained"
          onClick={cancel}
        >
          CANCEL
        </StyledButton>
      </>
    );
  };

  return (
    <div className="sign-in-background">
      <div className="form-image-container" id="background-image"></div>
      <div className="form-container">
        <form id="signInForm">
          <div
            className="logo"
            onClick={() => {
              window.location.href = "/";
            }}
          ></div>
          <h3>Log in</h3>
          {isLoggedIn ? (
            <AlreadyLoggedIn />
          ) : (
            <>
              <StyledTextField
                fullWidth
                variant="outlined"
                name="iEmail"
                label="Email Address"
                margin="normal"
              />
              <StyledTextField
                fullWidth
                variant="outlined"
                name="iPassword"
                label="Password"
                margin="normal"
                type="password"
              />
              <StyledButton
                type="submit"
                sx={{ marginTop: "4%" }}
                size="large"
                fullWidth
                variant="contained"
                onClick={task}
              >
                LOG IN
              </StyledButton>
              <div>
                <br />
                <button
                  type="button"
                  style={{
                    outline: "none",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  className="signup-link"
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push("/signup");
                  }}
                >
                  Don't have an account? Sign Up!
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default LogInForm;
