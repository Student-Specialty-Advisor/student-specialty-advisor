import AddVideo from "./Videos Options/AddVideo";
import DeleteVideo from "./Videos Options/DeleteVideo";

function VideosOptions(props) {
  return (
    <ul className="dashboard-options-list">
      <li key="v0">
        <AddVideo setVideosList={props.setVideosList} />
      </li>
      <li key="v1">
        <DeleteVideo
          videosList={props.videosList}
          setVideosList={props.setVideosList}
        />
      </li>
    </ul>
  );
}

export default VideosOptions;
