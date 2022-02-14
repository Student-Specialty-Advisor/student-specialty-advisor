import React, { useState } from "react";
import Authservice from "../../services/AuthService";
function Profile() {
  const userData = Authservice.getCurrentUser();
  const [isChanging, setIsChanging] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const changingState = () => {
    setIsChanging(true);
    setIsReadOnly(false);
  };
  const resetState = () => {
    setIsChanging(false);
    setIsReadOnly(true);
  };

  const onSubmit = () => {
    const newFirstName = document.getElementById("firstName").value;
    const newLastName = document.getElementById("lastName").value;
    const newEmail = document.getElementById("email").value;
    const newUniversityYear = document.getElementById("university year").value;
    const newData = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      universityYear: newUniversityYear,
      role: userData.role,
      accessToken: userData.accessToken,
    };

    const updatedJson = async () => {
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
      console.log(json);
      if (json.keyPattern) {
        alert("error occured");
      } else {
        Authservice.setCurrentUser(json);
        alert("success");
      }
    };
    updatedJson().then(() => resetState(false));
  };
  const showInfo = (
    <>
      <button onClick={changingState}>Edit Personal Info.</button>
      <button>Edit Password</button>
    </>
  );
  const changeInfo = <button onClick={onSubmit}>Submit</button>;

  return (
    <>
      <div>
        <h1>Welcome to Your Profile!</h1>
        <br />
        <h4>
          <b>First Name : </b>
          <input
            defaultValue={userData.firstName}
            id="firstName"
            readOnly={isReadOnly}
          ></input>
        </h4>
        <br />
        <h4>
          <b>Last Name : </b>
          <input
            defaultValue={userData.lastName}
            id="lastName"
            readOnly={isReadOnly}
          ></input>
        </h4>
        <br />
        <h4>
          <b>Email : </b>
          <input
            defaultValue={userData.email}
            id="email"
            readOnly={isReadOnly}
          ></input>
        </h4>
        <br />
        <h4>
          <b>University Year : </b>
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
        </h4>
        <br />
      </div>
      {isChanging ? changeInfo : showInfo}
    </>
  );
}

export default Profile;
