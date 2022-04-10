import React from "react";
import fetchService from "../../../../services/fetchService";
import alertify from "alertifyjs";
function DeleteVideo(props) {
  const select = React.useRef();
  const task = () => {
    fetchService
      .doDelete("videos/" + select.current.value)
      .then((response) => {
        if (response.success) {
          alertify.success("Video was deleted Successfully");
          props.setVideosList();
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
    return <option value={video._id}>{video.title}</option>;
  });
  return (
    <>
      <h1>Delete Video :</h1>
      {props.videosList.length === 0 ? (
        <p>
          <strong> There are no videos in the database yet.</strong>
        </p>
      ) : (
        <>
          <select ref={select}>{mapping}</select>
          <button onClick={task}>Submit</button>
        </>
      )}
    </>
  );
}

export default DeleteVideo;
