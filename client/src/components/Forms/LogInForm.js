import utils from "../utils";
import AuthService from "../../services/AuthService";
import React from "react";
import alertify from "alertifyjs";

function LogInForm(props) {
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

  /*const test = (e) => {
    e.preventDefault();
    try {
      var customRedirectPath = props.location.state.from.pathname;
    } catch (error) {
      props.history.push(defaultRedirectPath);
    }
    props.history.push(customRedirectPath);
  };*/

  /*const logout = (e) => {
    e.preventDefault();
    AuthSerice.logout();
  };*/

  const AlreadyLoggedIn = () => {
    const logout = () => {
      AuthService.logout();
      window.location.href = defaultRedirectPath;
    };
    const cancel = () => {
      window.location.href = defaultRedirectPath;
    };
    var email = AuthService.getCurrentUser().email;
    return (
      <div>
        <p>
          You are already logged in as {email}'s account. You need to logout if
          you wish to use another account!
        </p>
        <button onClick={logout}>Logout</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    );
  };

  const Form = (
    <div className="sign-in-background">
      <div className="sign-in-form-container">
        <form id="signInForm">
          <h3>Please type your account information:</h3>
          <label htmlFor="iEmail"></label>
          <br></br>
          <input
            type="text"
            name="iEmail"
            placeholder="E-mail Address.."
          ></input>
          <br />
          <br />
          <label htmlFor="iPassword"></label>
          <br></br>
          <input
            type="password"
            name="iPassword"
            placeholder="Password.."
          ></input>
          <br /> <br /> <br /> <br />
          <button id="taskButton" onClick={task}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );

  return isLoggedIn ? <AlreadyLoggedIn /> : Form;
}

export default LogInForm;
