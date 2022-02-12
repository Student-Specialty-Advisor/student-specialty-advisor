import utils from "../utils";
import AuthSerice from "../../services/AuthService";

function LogInForm(props) {
  const defaultRedirectPath = "/home";

  const getFormData = () => {
    var form = document.getElementById("signInForm").elements;
    var email = utils.check(form["iEmail"].value);
    if (email === null) return utils.invalidEmail;
    if (
      email.substring(email.indexOf("@") + 1) !== utils.possibleEmail[0] &&
      email.substring(email.indexOf("@") + 1) !== utils.possibleEmail[1]
    )
      return utils.invalidEmail;
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
      alert("Error: Make sure to enter a valid e-mail!");
    } else if (data === utils.invalidPassword) {
      alert("Error: No password was given!");
    } else {
      AuthSerice.login(data).then((response) => {
        if (response.keyPattern) {
          alert(
            "Error: Invalid Credentials. Make sure you have written your e-mail and password correctly!"
          );
        } else {
          try {
            var customRedirectPath = props.location.state.from.pathname;
          } catch (error) {
            console.log(error);
            props.history.push(defaultRedirectPath);
          }
          console.log(customRedirectPath);
          props.history.push(customRedirectPath);

          //window.location.reload();
        }
      });
    }
  };

  /*const test = (e) => {
    e.preventDefault();
    try {
      var customRedirectPath = props.location.state.from.pathname;
    } catch (error) {
      console.log(error);
      props.history.push(defaultRedirectPath);
    }
    console.log(customRedirectPath);
    props.history.push(customRedirectPath);
  };*/

  /*const logout = (e) => {
    e.preventDefault();
    AuthSerice.logout();
  };*/

  const Form = (
    <form id="signInForm">
      <h3>Sign into your account!</h3>
      <label htmlFor="iEmail">E-mail Address:</label>
      <br></br>
      <input type="text" name="iEmail"></input>
      <br></br>
      <label htmlFor="iPassword">Password:</label>
      <br></br>
      <input type="password" name="iPassword"></input>
      <br></br>
      <button id="taskButton" onClick={task}>
        Sign In now!
      </button>
    </form>
  );

  return <div>{Form}</div>;
}

export default LogInForm;
