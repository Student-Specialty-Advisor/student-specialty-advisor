import alertify from "alertifyjs";
import React from "react";
import fetchService from "../../../../services/fetchService";

function AddVideo() {
  const videoLink = React.useRef();
  const specialty = React.useRef();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const handleChange = () => {
    if (videoLink.current.value !== "" && specialty.current.value !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const task = () => {
    if (videoLink.current.value.includes("www.youtube.com")) {
      const code = videoLink.current.value.split("=")[1].substr(0, 11);
      const data = {
        link: code,
        specialty: specialty.current.value,
      };
      fetchService
        .doPOST("videos", data)
        .then((response) => {
          if (response.success) {
            alertify.success("Video Added Successfully");
          } else {
            console.log(response);
            alertify.warning(
              "This video " +
                Object.keys(response.errorObject.keyPattern) +
                " already exists "
            );
          }
        })
        .catch(() => {
          alertify.error(
            "Please try later , an error has occurred while posting the advisor"
          );
        });
    } else {
      alertify.warning("Please enter a valid youtube link");
    }
  };
  return (
    <>
      <h1>Add Video :</h1>
      <label>Video Link: </label>
      <br />
      <input type="text" ref={videoLink} onChange={handleChange}></input>
      <br />
      <label>Specialty : </label>
      <br />
      <select ref={specialty}>
        <option value="SE">Software Engineering</option>
        <option value="CSE">Computer Systems Engineering</option>
        <option value="REE">Renewable Energy Engineering</option>
      </select>
      <br />
      <button onClick={task} disabled={isDisabled}>
        Submit
      </button>
    </>
  );
}

export default AddVideo;
