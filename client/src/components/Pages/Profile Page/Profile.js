import alertify from "alertifyjs";
import React from "react";
import AuthService from "../../../services/AuthService";
import fetchService from "../../../services/fetchService";
import utils from "../../utils";

function Profile(props) {
  React.useEffect(() => {
    document.title = "My Profile - Student Specialty Advisor";
  }, []);

  const [isChanging, setIsChanging] = React.useState(false);
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [userData, setUserData] = React.useState(AuthService.getCurrentUser());
  const changePasswordPath = "/profile/password";

  const changingState = (bool) => {
    setIsChanging(bool);
    setIsReadOnly(!bool);
  };

  const updateInfo = async (newData) => {
    const json = await fetchService.doPUT("edit-profile", newData);
    if (json.tokenError) {
      AuthService.alertifyInvalidToken();
      throw utils.emptyInput;
    } else if (json.keyPattern) {
      if (json.keyPattern.email) {
        alertify.error(
          "Seems like this email is already used by another account!"
        );
        throw utils.invalidEmail;
      } else {
        alertify.error(
          "Error occured while updating profile. Try again later!"
        );
        throw utils.emptyInput;
      }
    } else if (json.accessToken) {
      AuthService.setCurrentUser(json);
      setUserData(json);
      alertify.success("Updating profile was successful!");
    }
  };

  const refreshInputFields = () => {
    document.getElementById("firstName").value =
      document.getElementById("firstName").defaultValue;
    document.getElementById("lastName").value =
      document.getElementById("lastName").defaultValue;
    document.getElementById("email").value =
      document.getElementById("email").defaultValue;
    document.getElementById("university year").value = userData.universityYear;
  };

  const cancel = () => {
    refreshInputFields();
    changingState(false);
  };

  const submit = () => {
    const newFirstName = document.getElementById("firstName").value;
    const newLastName = document.getElementById("lastName").value;
    const newEmail = document.getElementById("email").value;
    const newUniversityYear = document.getElementById("university year").value;
    if (newFirstName === "" || newLastName === "" || newEmail === "") {
      alertify.warning("Hey! Some important fields were left empty!");
    } else if (!utils.isValidEmail(newEmail)) {
      alertify.warning("Make sure to enter a valid SMU / MEDTECH e-mail!");
    } else {
      const newData = {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        universityYear: newUniversityYear,
      };
      updateInfo(newData)
        .then(() => {
          changingState(false);
        })
        .catch((error) => {
          return;
        });
    }
  };

  const showInfo = (
    <div className="profile-button-container">
      <button onClick={() => changingState(true)}>Change Information</button>
      <button onClick={() => props.history.push(changePasswordPath)}>
        Change Password
      </button>
    </div>
  );
  const changeInfo = (
    <div className="profile-button-container">
      <button onClick={submit}>Submit</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );

  return (
    <>
      <div className="profile-container">
        <h1>Welcome to Your Profile!</h1>
        {isChanging ? (
          <h4>
            You are changing your profile information. Click on the submit
            button to confirm your changes!
          </h4>
        ) : null}
        <ul>
          <li>
            <label>First Name: </label>
            <input
              defaultValue={userData.firstName}
              id="firstName"
              readOnly={isReadOnly}
            ></input>
          </li>
          <li>
            <label>Last Name: </label>
            <input
              defaultValue={userData.lastName}
              id="lastName"
              readOnly={isReadOnly}
            ></input>
          </li>
          <li>
            <label>Email: </label>
            <input
              defaultValue={userData.email}
              id="email"
              readOnly={isReadOnly}
            ></input>
          </li>
          <li>
            <label>University Year: </label>
            <select
              defaultValue={userData.universityYear}
              id="university year"
              disabled={isReadOnly}
            >
              <option value="Freshman">Freshman year</option>
              <option value="Sophomore">Sophomore year</option>
              <option value="Junior">Junior year</option>
              <option value="Senior">Senior year</option>
              <option value="Final">Final year</option>
            </select>
          </li>
        </ul>
      </div>
      {isChanging ? changeInfo : showInfo}
    </>
  );
}

export default Profile;
