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
        <input value={userData.firstName} />
      </h4>

      <br />
      <h4>
        <b>Last Name : </b>
        <input value={userData.lastName} />
      </h4>
      <br />
      <h4>
        <b>Email : </b>
        <input value={userData.email} />
      </h4>
      <br />
      <h4>
        <b>University Year : </b>
        <input value={userData.universityYear} />
      </h4>
      <br />
      <button>Edit Personal Info.</button>
      <button>Edit Password</button>
    </div>
  );
}

export default Profile;
