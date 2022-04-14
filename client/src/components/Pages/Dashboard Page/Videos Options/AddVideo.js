import alertify from "alertifyjs";
import React from "react";
import fetchService from "../../../../services/fetchService";
import {
  StyledTextField,
  StyledButton,
  StyledMenuItem,
} from "../../../Basic Elements/StyledBasicElements";

function AddVideo(props) {
  const videoTitle = React.useRef();
  const videoLink = React.useRef();
  const [specialty, setSpecialty] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleChange = () => {
    if (
      videoTitle.current.value !== "" &&
      videoLink.current.value !== "" &&
      specialty !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleSelectChange = (event) => {
    setSpecialty(event.target.value);
  };

  React.useEffect(() => {
    if (specialty !== "") {
      if (videoLink.current.value !== "" && videoTitle.current.value !== "") {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [specialty]);

  const task = () => {
    if (videoLink.current.value.includes("www.youtube.com")) {
      var code;
      try {
        code = videoLink.current.value.split("=")[1].substr(0, 11);
      } catch (error) {
        alertify.warning("Please enter a valid youtube link");
        return;
      }
      const data = {
        title: videoTitle.current.value,
        link: code,
        specialty: specialty,
      };
      fetchService
        .doPOST("videos", data)
        .then((response) => {
          if (response.success) {
            alertify.success("Video Added Successfully");
            props.setVideosList();
            props.refresh();
          } else {
            alertify.warning(
              "This video " +
                Object.keys(response.errorObject.keyPattern) +
                " already exists "
            );
          }
        })
        .catch(() => {
          alertify.error(
            "Please try later , an error has occurred while posting the video"
          );
        });
    } else {
      alertify.warning("Please enter a valid youtube link");
    }
  };
  return (
    <>
      <StyledTextField
        size="small"
        label="Video Title"
        onChange={handleChange}
        inputRef={videoTitle}
        variant="outlined"
        margin="dense"
      />
      <br />
      <StyledTextField
        size="small"
        label="Video Link"
        onChange={handleChange}
        inputRef={videoLink}
        variant="outlined"
        margin="dense"
      />
      <br />
      <StyledTextField
        select
        size="small"
        label="Specialty"
        value={specialty}
        onChange={handleSelectChange}
        variant="outlined"
        margin="dense"
        sx={{ width: 225 }}
      >
        <StyledMenuItem value="SE">Software Engineering</StyledMenuItem>
        <StyledMenuItem value="CSE">
          Computer Systems Engineering
        </StyledMenuItem>
        <StyledMenuItem value="REE">
          Renewable Energy Engineering
        </StyledMenuItem>
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
  );
}

export default AddVideo;
