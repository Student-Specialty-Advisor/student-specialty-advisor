import AddVideo from "./Videos Options/AddVideo";
import DeleteVideo from "./Videos Options/DeleteVideo";

function VideosOptions(props) {
  return (
    <ul className="dashboard-options-list">
      <li>
        <AddVideo setVideosList={props.setVideosList} />
      </li>
      <li>
        <DeleteVideo
          videosList={props.videosList}
          setVideosList={props.setVideosList}
        />
      </li>
      <li>
        <p>Your component goes here inside the li</p>
      </li>
    </ul>
  );
}

export default VideosOptions;
