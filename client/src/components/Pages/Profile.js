import React from "react";
import Authservice from "../../services/AuthService";
function Profile() {
  const userData = Authservice.getCurrentUser();
  return (
    <div>
      <h1>Welcome to Your Profile!</h1>
      <br />
      <h4>
        <b>First Name : </b>
        {userData.firstName}
      </h4>
      <br />
      <h4>
        <b>Last Name : </b>
        {userData.lastName}
      </h4>
      <br />
      <h4>
        <b>Email : </b>
        {userData.email}
      </h4>
      <br />
      <h4>
        <b>University Year : </b>
        {userData.universityYear}
      </h4>
      <br />
    </div>
  );
}

export default Profile;
