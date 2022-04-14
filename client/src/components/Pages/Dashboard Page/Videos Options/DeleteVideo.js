import React from "react";
import fetchService from "../../../../services/fetchService";
import alertify from "alertifyjs";
import {
  StyledMenuItem,
  StyledButton,
  StyledTextField,
} from "../../../Basic Elements/StyledBasicElements";

function DeleteVideo(props) {
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
      .doDelete("videos/" + select)
      .then((response) => {
        if (response.success) {
          alertify.success("Video was deleted Successfully");
          props.setVideosList();
          props.refresh();
        } else {
          alertify.error(
            "Please try later , an error has occurred while deleting the video"
          );
        }
      })
      .catch(() => {
        alertify.error(
          "Please try later , an error has occurred while deleting the video"
        );
      });
  };
  const mapping = props.videosList.map((video) => {
    return (
      <StyledMenuItem key={video._id} value={video._id}>
        {video.title}
      </StyledMenuItem>
    );
  });
  return (
    <>
      {props.videosList.length === 0 ? (
        <p>
          <strong> There are no videos in the database yet.</strong>
        </p>
      ) : (
        <>
          <StyledTextField
            select
            size="small"
            label="Video"
            value={select}
            onChange={handleSelectChange}
            variant="outlined"
            margin="dense"
            sx={{ width: 225 }}
            helperText="Please select a video to delete"
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

export default DeleteVideo;
