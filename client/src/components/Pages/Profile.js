import React from "react";
import Data from "../../services/AuthService";
function Profile() {
  const userData = Data.getCurrentUser();
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
      {/*<h4>
        <b>Password : </b>
        {userData.password}
      </h4>
      <br />*/}
    </div>
  );
}

export default Profile;
