import React from "react";
import alertify from "alertifyjs";
import fetchService from "../../../../services/fetchService.js";
import {
  StyledButton,
  StyledMenuItem,
  StyledTextField,
} from "../../../Basic Elements/StyledBasicElements.js";
function RenameThread(props) {
  const [select, setSelect] = React.useState("");
  const [isHidden, setIsHidden] = React.useState(true);
  const [currentThread, setCurrentThread] = React.useState({});
  const name = React.useRef();

  React.useEffect(() => {
    if (select !== "") {
      setCurrentThread(props.threadsList[select]);
      setIsHidden(false);
    }
  }, [select, props.threadsList]);
  const task = () => {
    const json = {};
    if (name.current.value !== "") json.name = name.current.value;
    fetchService
      .doPUT("dashboard/threads/" + props.threadsList[select].name, json)
      .then((response) => {
        if (response.success) {
          alertify.success("Thread was updated Successfully");
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
          "Please try later , an error has occurred while updating the thread"
        );
      });
  };
  const mapping = props.threadsList.map((thread, index) => {
    return (
      <StyledMenuItem value={index} key={index}>
        {thread.name}
      </StyledMenuItem>
    );
  });
  return (
    <>
      <p>Only the fields that you change are going to be updated</p>
      <StyledTextField
        select
        size="small"
        label="Thread"
        value={select}
        onChange={(event) => {
          setSelect(event.target.value);
        }}
        variant="outlined"
        margin="dense"
        sx={{ width: 225 }}
        helperText="Please select a thread to update"
      >
        {mapping}
      </StyledTextField>
      {isHidden === true ? null : (
        <div key={currentThread._id}>
          <StyledTextField
            size="small"
            label="Name"
            defaultValue={currentThread.name}
            variant="outlined"
            margin="dense"
            inputRef={name}
          />
          <br />
          <StyledButton
            sx={{ marginTop: "1%" }}
            variant="contained"
            onClick={task}
          >
            Submit
          </StyledButton>
        </div>
      )}
    </>
  );
}

export default RenameThread;
