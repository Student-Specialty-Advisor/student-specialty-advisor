import React from "react";
import {
  StyledButton,
  StyledMenuItem,
  StyledTextField,
} from "../../../Basic Elements/StyledBasicElements.js";
import alertify from "alertifyjs";
import fetchService from "../../../../services/fetchService.js";

function DeleteThread(props) {
  const [select, setSelect] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const handleSelectChange = (event) => {
    setSelect(event.target.value);
    if (isDisabled === true) {
      setIsDisabled(false);
    }
  };
  const task = () => {
    fetchService
      .doDelete("dashboard/threads/" + select)
      .then((response) => {
        if (response.success) {
          alertify.success("Thread was deleted Successfully");
          props.setThreadsList();
          props.refresh();
        } else {
          alertify.error(
            "Please try later , an error has occurred while deleting the thread"
          );
        }
      })
      .catch(() => {
        alertify.error(
          "Please try later , an error has occurred while deleting the thread"
        );
      });
  };
  const mapping = props.threadsList.map((thread) => {
    return (
      <StyledMenuItem key={thread._id} value={thread.name}>
        {thread.name}
      </StyledMenuItem>
    );
  });
  return (
    <>
      {props.threadsList.length === 0 ? (
        <p>
          <strong> There are no threads in the database yet.</strong>
        </p>
      ) : (
        <>
          <StyledTextField
            select
            size="small"
            label="Thread"
            value={select}
            onChange={handleSelectChange}
            variant="outlined"
            margin="dense"
            sx={{ width: 225 }}
            helperText="Please select a thread to delete"
          >
            {mapping}
          </StyledTextField>
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
      )}
    </>
  );
}

export default DeleteThread;
