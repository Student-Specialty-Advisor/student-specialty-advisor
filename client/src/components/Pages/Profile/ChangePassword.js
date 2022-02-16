import AuthService from "../../../services/AuthService";

function ChangePassword(props) {
  const updatePassword = async () => {
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const newPassword2 = document.getElementById("newPassword2").value;
    if (newPassword === newPassword2) {
      const userData = AuthService.getCurrentUser();
      const passwordJson = {
        currentPassword: currentPassword,
        password: newPassword,
      };
      const response = await fetch(
        process.env.REACT_APP_API_URL + "edit-profile",
        {
          method: "PUT",
          body: JSON.stringify(passwordJson),
          headers: {
            "x-access-token": userData.accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (json.keyPattern) {
        alert("The given current password is incorrect. Try again!");
      } else {
        alert("Password was changed successfully. Please re-login!");
        AuthService.logout();
        props.history.push("/login");
        window.location.reload();
      }
    } else {
      alert("New Password fields are not matching!");
    }
  };

  return (
    <div>
      <h1>Welcome to Your Profile!</h1>
      <h4>
        You are changing your password. Click on the submit button to confirm
        your changes!
      </h4>
      <label>Current Password: </label>
      <input type="password" id="currentPassword"></input>
      <br></br>
      <br></br>
      <label>New Password: </label>
      <input type="password" id="newPassword"></input>
      <br></br>
      <br></br>
      <label>Repeat New Password: </label>
      <input type="password" id="newPassword2"></input>
      <br></br>
      <br></br>
      <button onClick={updatePassword}>Submit</button>
      <button onClick={() => props.history.push("/profile")}>Cancel</button>
    </div>
  );
}

export default ChangePassword;
