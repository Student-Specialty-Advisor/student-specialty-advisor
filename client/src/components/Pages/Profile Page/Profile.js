import alertify from "alertifyjs";
import React from "react";
import AuthService from "../../../services/AuthService";
import fetchService from "../../../services/fetchService";
import utils from "../../utils";
import {
  StyledTextField,
  StyledButton,
  StyledMenuItem,
} from "../../Basic Elements/StyledBasicElements";
function Profile(props) {
  React.useEffect(() => {
    document.title = "My Profile - Student Specialty Advisor";
  }, []);

  const [isChanging, setIsChanging] = React.useState(false);
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [userData, setUserData] = React.useState(AuthService.getCurrentUser());
  const [universityYear, setUniversityYear] = React.useState("");
  const [isCanceled, setIsCanceled] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const changePasswordPath = "/profile/password";

  const changingState = (bool) => {
    setIsChanging(bool);
    setIsReadOnly(!bool);
    setIsCanceled(true);
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
    document.getElementById("firstName").value = userData.firstName;
    document.getElementById("lastName").value = userData.lastName;
    document.getElementById("email").value = userData.email;
    setUniversityYear(userData.universityYear);
  };

  const cancel = () => {
    refreshInputFields();
    changingState(false);
    setIsCanceled(false);
    setHasError(false);
  };

  const submit = () => {
    const newFirstName = document.getElementById("firstName").value;
    const newLastName = document.getElementById("lastName").value;
    const newEmail = document.getElementById("email").value;
    if (newFirstName === "" || newLastName === "" || newEmail === "") {
      alertify.warning("Hey! Some important fields were left empty!");
    } else if (!utils.isValidEmail(newEmail)) {
      alertify.warning("Make sure to enter a valid SMU / MEDTECH e-mail!");
      setHasError(true);
    } else {
      const newData = {
        firstName: newFirstName,
        lastName: newLastName,
        email: newEmail,
        universityYear: universityYear,
      };
      updateInfo(newData)
        .then(() => {
          changingState(false);
          if (hasError) setHasError(false);
        })
        .catch((error) => {
          return;
        });
    }
  };

  const showInfo = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "auto",
      }}
    >
      <StyledButton
        onClick={() => changingState(true)}
        size="large"
        sx={{ marginTop: "2%" }}
      >
        Change Information
      </StyledButton>
      <StyledButton
        onClick={() => props.history.push(changePasswordPath)}
        size="large"
        sx={{ marginTop: "2%" }}
      >
        Change Password
      </StyledButton>
    </div>
  );
  const changeInfo = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "auto",
      }}
    >
      <StyledButton onClick={submit} size="large" sx={{ marginTop: "2%" }}>
        Submit
      </StyledButton>
      <StyledButton onClick={cancel} size="large" sx={{ marginTop: "2%" }}>
        Cancel
      </StyledButton>
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

        <StyledTextField
          id="firstName"
          label="First Name"
          defaultValue={userData.firstName}
          InputProps={{
            readOnly: isReadOnly,
          }}
          margin="normal"
          fullWidth
        />
        <br />
        <StyledTextField
          id="lastName"
          label="Last Name"
          defaultValue={userData.lastName}
          InputProps={{
            readOnly: isReadOnly,
          }}
          margin="normal"
          fullWidth
        />
        <br />
        <StyledTextField
          error={hasError}
          id="email"
          label="Email"
          defaultValue={userData.email}
          InputProps={{
            readOnly: isReadOnly,
          }}
          margin="normal"
          fullWidth
          helperText={hasError ? "Incorrect entry." : ""}
        />
        <br />
        <StyledTextField
          key={isCanceled}
          select
          id="university year"
          label="University Year"
          defaultValue={userData.universityYear}
          onChange={(event) => {
            setUniversityYear(event.target.value);
          }}
          variant="outlined"
          margin="dense"
          SelectProps={{
            readOnly: isReadOnly,
          }}
          fullWidth
        >
          <StyledMenuItem value="Freshman">Freshman year</StyledMenuItem>
          <StyledMenuItem value="Sophomore">Sophomore year</StyledMenuItem>
          <StyledMenuItem value="Junior">Junior year</StyledMenuItem>
          <StyledMenuItem value="Senior">Senior year</StyledMenuItem>
          <StyledMenuItem value="Final">Final year</StyledMenuItem>
        </StyledTextField>
        {isChanging ? changeInfo : showInfo}
      </div>
    </>
  );
}

export default Profile;
