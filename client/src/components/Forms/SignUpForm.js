import AuthService from "../../services/AuthService";
import utils from "../utils";

function SignUpForm() {
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
      alert("Some fields were left empty. Make sure to fill them!");
    } else if (data === utils.invalidEmail) {
      alert("Error: Make sure to enter a valid e-mail!");
    } else if (data === utils.invalidPassword) {
      alert("Password fields are not matching!");
    } else {
      AuthService.register(data).then((response) => {
        if (response.keyPattern) {
          alert("Error: Email is already used!");
        } else {
          alert("Sign up was successful!");
        }
      });
    }
  };

  const Form = (
    <form id="signUpForm">
      <h3>Create your account in a few steps!</h3>
      <label htmlFor="iFirstName">First Name:</label>
      <br></br>
      <input type="text" name="iFirstName"></input>
      <br></br>
      <label htmlFor="iLastName">Last Name:</label>
      <br></br>
      <input type="text" name="iLastName"></input>
      <br></br>
      <label htmlFor="iUniversityYear">University Year:</label> <br></br>
      <select name="iUniversityYear">
        <option value="Freshman">Freshman year</option>
        <option value="Sophomore">Sophomore year</option>
        <option value="Junior">Junior year</option>
        <option value="Senior">Senior year</option>
        <option value="Final">Final year</option>
      </select>
      <br></br>
      <label htmlFor="iEmail">E-mail Address:</label>
      <br></br>
      <input type="text" name="iEmail"></input>
      <br></br>
      <label htmlFor="iPassword">Password:</label>
      <br></br>
      <input type="password" name="iPassword"></input>
      <br></br>
      <label htmlFor="iPassword2">Confirm Password:</label>
      <br></br>
      <input type="password" name="iPassword2"></input>
      <br></br>
      <button id="taskButton" onClick={task}>
        Sign up now!
      </button>
    </form>
  );

  return <div>{Form}</div>;
}

export default SignUpForm;
