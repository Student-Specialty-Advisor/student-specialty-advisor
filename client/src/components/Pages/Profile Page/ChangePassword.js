import alertify from "alertifyjs";
import AuthService from "../../../services/AuthService";
import React from "react";
import fetchService from "../../../services/fetchService";

function ChangePassword(props) {
  React.useEffect(() => {
    document.title = "My Profile - Student Specialty Advisor";
  }, []);

  const updatePassword = async () => {
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const newPassword2 = document.getElementById("newPassword2").value;
    if (newPassword === "" || newPassword2 === "" || currentPassword === "") {
      alertify.warning("Hey! Some important fields were left empty!");
      return;
    }
    if (newPassword === newPassword2) {
      const passwordJson = {
        currentPassword: currentPassword,
        password: newPassword,
      };
      const json = await fetchService.doPUT("edit-profile", passwordJson);
      if (json.tokenError) {
        AuthService.alertifyInvalidToken();
      } else if (json.keyPattern) {
        alertify.error("The given current password is incorrect. Try again!");
      } else {
        window.addEventListener("beforeunload", () => {
          AuthService.logout();
        });
        alertify.alert(
          "Password was changed successfully. Please re-login!",
          function () {
            AuthService.logout();
            window.location.href = "/login";
          }
        );
      }
    } else {
      alertify.warning("New Password fields are not matching!");
    }
  };

  return (
    <div className="profile-container">
      <h1>Welcome to Your Profile!</h1>
      <h4>
        You are changing your password. Click on the submit button to confirm
        your changes!
      </h4>
      <ul>
        <li>
          <label>Current Password: </label>
          <input type="password" id="currentPassword"></input>
        </li>
        <br />

        <li>
          <label>New Password: </label>
          <input type="password" id="newPassword"></input>
        </li>
        <li>
          <label>Confirm Password: </label>
          <input type="password" id="newPassword2"></input>
        </li>
      </ul>
      <div className="profile-button-container">
        <button onClick={updatePassword}>Submit</button>
        <button onClick={() => props.history.push("/profile")}>Cancel</button>
      </div>
    </div>
  );
}

export default ChangePassword;
