import React from "react";
import {
  StyledButton,
  StyledTextField,
} from "../../../Basic Elements/StyledBasicElements";
import fetchService from "../../../../services/fetchService";
import alertify from "alertifyjs";
function AddThread(props) {
  const [name, setName] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const task = () => {
    fetchService
      .doPOST("forum/threads", { name: name })
      .then((response) => {
        if (response.success) {
          alertify.success("Thread Added Successfully");
          props.setThreadsList();
          props.refresh();
        } else {
          alertify.warning(
            "A Thread with this " +
              Object.keys(response.errorObject.keyPattern) +
              " already exists"
          );
        }
      })
      .catch(() => {
        alertify.error(
          "Please try later , an error has occurred while posting the thread"
        );
      });
  };
  React.useEffect(() => {
    if (name === "") setIsDisabled(true);
    else setIsDisabled(false);
  }, [name]);
  return (
    <>
      <StyledTextField
        size="small"
        label="Name"
        value={name}
        onChange={handleChange}
        variant="outlined"
        margin="dense"
      />
      <br />
      <StyledButton
        sx={{ marginTop: "1%" }}
        variant="contained"
        onClick={task}
        disabled={isDisabled}
      >
        Submit
      </StyledButton>
    </>
  );
}

export default AddThread;
