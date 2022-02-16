import React from "react";
import Authservice from "../../../services/AuthService";
import utils from "../../utils";

function Profile(props) {
  const [isChanging, setIsChanging] = React.useState(false);
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [userData, setUserData] = React.useState(Authservice.getCurrentUser());
  const changePasswordPath = "/profile/password";

  const changingState = (bool) => {
    setIsChanging(bool);
    setIsReadOnly(!bool);
  };

  const updateInfo = async (newData) => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "edit-profile",
      {
        method: "PUT",
        body: JSON.stringify(newData),
        headers: {
          "x-access-token": userData.accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.keyPattern) {
      alert("error occured");
    } else if (json.accessToken) {
      Authservice.setCurrentUser(json);
      setUserData(json);
      alert("success");
    }
  };

  const cancel = () => {
    document.getElementById("firstName").value =
      document.getElementById("firstName").defaultValue;
    document.getElementById("lastName").value =
      document.getElementById("lastName").defaultValue;
    document.getElementById("email").value =
      document.getElementById("email").defaultValue;
    document.getElementById("university year").value = userData.universityYear;
    changingState(false);
  };

  const submit = () => {
    const newFirstName = document.getElementById("firstName").value;
    const newLastName = document.getElementById("lastName").value;
    const newEmail = document.getElementById("email").value;
    const newUniversityYear = document.getElementById("university year").value;
    if (newFirstName === "" || newLastName === "" || newEmail === "") {
      alert("Some fields were left empty. Please make sure to fill them!");
    } else if (!utils.isValidEmail(newEmail)) {
      alert(
        "An invalid email was given. Email should end with medtech.tn or smu.tn!"
      );
    } else {
      const newData = {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        universityYear: newUniversityYear,
        accessToken: userData.accessToken,
      };
      updateInfo(newData).then(() => changingState(false));
    }
  };

  const showInfo = (
    <div>
      <button onClick={() => changingState(true)}>Change Information</button>
      <button onClick={() => props.history.push(changePasswordPath)}>
        Change Password
      </button>
    </div>
  );
  const changeInfo = (
    <div>
      <button onClick={submit}>Submit</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );

  return (
    <>
      <div>
        <h1>Welcome to Your Profile!</h1>
        {isChanging ? (
          <h4>
            You are changing your profile information. Click on the submit
            button to confirm your changes!
          </h4>
        ) : null}
        <label>First Name: </label>
        <input
          defaultValue={userData.firstName}
          id="firstName"
          readOnly={isReadOnly}
        ></input>
        <br></br> <br></br>
        <label>Last Name: </label>
        <input
          defaultValue={userData.lastName}
          id="lastName"
          readOnly={isReadOnly}
        ></input>
        <br></br> <br></br>
        <label>Email: </label>
        <input
          defaultValue={userData.email}
          id="email"
          readOnly={isReadOnly}
        ></input>
        <br></br> <br></br>
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
        <br></br> <br></br>
      </div>
      {isChanging ? changeInfo : showInfo}
    </>
  );
}

export default Profile;
