import alertify from "alertifyjs";
import AuthService from "../../../services/AuthService";
import React from "react";
import fetchService from "../../../services/fetchService";
import Footer from "../Footer";
import {
  StyledTextField,
  StyledButton,
} from "../../Basic Elements/StyledBasicElements";
function ChangePassword(props) {
  React.useEffect(() => {
    document.title = "My Profile - Student Specialty Advisor";
  }, []);
  const [hasError, setHasError] = React.useState(false);
  const [isNotMatching, setIsNotMatching] = React.useState(false);
  const updatePassword = async () => {
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const newPassword2 = document.getElementById("newPassword2").value;
    if (newPassword === "" || newPassword2 === "" || currentPassword === "") {
      alertify.warning("Hey! Some important fields were left empty!");
      return;
    }
    if (newPassword === newPassword2) {
      setIsNotMatching(false);
      const passwordJson = {
        currentPassword: currentPassword,
        password: newPassword,
      };
      const json = await fetchService.doPUT("edit-profile", passwordJson);
      if (json.tokenError) {
        AuthService.alertifyInvalidToken();
      } else if (json.keyPattern) {
        alertify.error("The given current password is incorrect. Try again!");
        setHasError(true);
      } else {
        window.addEventListener("beforeunload", () => {
          AuthService.logout();
        });
        setHasError(false);
        alertify.alert(
          "Password was changed successfully. Please re-login!",
          function() {
            AuthService.logout();
            window.location.href = "/login";
          }
        );
      }
    } else {
      alertify.warning("New Password fields are not matching!");
      setIsNotMatching(true);
    }
  };

  return (
    <>
      <div className="profile-container">
        <h1>Welcome to Your Profile!</h1>
        <h4>
          You are changing your password. Click on the submit button to confirm
          your changes!
        </h4>

        <StyledTextField
          error={hasError}
          id="currentPassword"
          type="password"
          fullWidth
          label="Current Password"
          margin="normal"
          helperText={hasError ? "Incorrect entry." : ""}
        />
        <StyledTextField
          error={isNotMatching}
          id="newPassword"
          type="password"
          fullWidth
          label="New Password"
          margin="normal"
          helperText={isNotMatching ? "Fields are not matching." : ""}
        />
        <StyledTextField
          error={isNotMatching}
          id="newPassword2"
          type="password"
          fullWidth
          label="Confirm New Password"
          margin="normal"
          helperText={isNotMatching ? "Fields are not matching." : ""}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            margin: "auto",
          }}
        >
          <StyledButton
            onClick={updatePassword}
            size="large"
            sx={{ marginTop: "3%" }}
          >
            Submit
          </StyledButton>
          <StyledButton
            onClick={() => props.history.push("/profile")}
            size="large"
            sx={{ marginTop: "2%" }}
          >
            Cancel
          </StyledButton>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
