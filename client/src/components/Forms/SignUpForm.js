import { Redirect } from "react-router-dom";
import AuthService from "../../services/AuthService";
import utils from "../utils";
import alertify from "alertifyjs";

function SignUpForm(props) {
  const loginPagePath = "/login";

  const isLoggedIn = AuthService.isLoggedIn();

  const getFormData = () => {
    var form = document.getElementById("signUpForm").elements;
    var firstName = utils.check(form["iFirstName"].value);
    if (firstName === null) return utils.emptyInput;
    var lastName = utils.check(form["iLastName"].value);
    if (lastName === null) return utils.emptyInput;
    var email = utils.check(form["iEmail"].value);
    if (email === null) return utils.emptyInput;
    if (!utils.isValidEmail(email)) return utils.invalidEmail;
    var password = utils.check(form["iPassword"].value);
    if (password === null) return utils.emptyInput;
    var repeatPassword = utils.check(form["iPassword2"].value);
    if (repeatPassword === null) return utils.emptyInput;
    if (password !== repeatPassword) return utils.invalidPassword;

    const formDataHolder = {
      firstName: firstName,
      lastName: lastName,
      universityYear:
        document.getElementById("signUpForm").elements["iUniversityYear"].value,
      email: email,
      password: password,
    };

    return formDataHolder; // If all values are there, create an object with them and return it
  };

  const task = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page on button click
    var data = getFormData();
    if (data === utils.emptyInput) {
      alertify.warning("Hey! Some important fields were left empty!");
    } else if (data === utils.invalidEmail) {
      alertify.warning("Make sure to enter a valid SMU / MEDTECH e-mail!");
    } else if (data === utils.invalidPassword) {
      alertify.warning("Password fields are not matching!");
    } else {
      AuthService.register(data).then((response) => {
        if (response.keyPattern) {
          alertify.error(
            "Seems like this email is already used by another account!"
          );
        } else {
          alertify.success(
            "Sign up was successful. You can now log into your account!"
          );
          props.history.push(loginPagePath);
        }
      });
    }
  };

  const Form = (
    <div className="sign-up-background">
      <div className="sign-up-form-container">
        <form id="signUpForm">
          <h3>Create your account in a few steps!</h3>
          <label htmlFor="iFirstName"></label>
          <br></br>
          <input
            type="text"
            name="iFirstName"
            placeholder="First Name.."
          ></input>
          <br></br>
          <label htmlFor="iLastName"></label>
          <br></br>
          <input type="text" name="iLastName" placeholder="Last Name.."></input>
          <br></br>
          <label htmlFor="iUniversityYear">University Year :</label>
          <select
            name="iUniversityYear"
            style={{
              width: "230px",
              marginTop: "30px",
              marginLeft: "10px",
            }}
          >
            <option value="Freshman">Freshman year</option>
            <option value="Sophomore">Sophomore year</option>
            <option value="Junior">Junior year</option>
            <option value="Senior">Senior year</option>
            <option value="Final">Final year</option>
          </select>
          <br></br>
          <label htmlFor="iEmail"></label>
          <br></br>
          <input
            type="text"
            name="iEmail"
            placeholder="E-mail Address.."
          ></input>
          <br></br>
          <label htmlFor="iPassword"></label>
          <br></br>
          <input
            type="password"
            name="iPassword"
            placeholder="Password.."
          ></input>
          <br></br>
          <label htmlFor="iPassword2"></label>
          <br></br>
          <input
            type="password"
            name="iPassword2"
            placeholder="Confirm Password.."
          ></input>
          <br></br>
          <button id="taskButton" onClick={task}>
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );

  return isLoggedIn ? <Redirect to="/login" /> : <div>{Form}</div>;
}

export default SignUpForm;
