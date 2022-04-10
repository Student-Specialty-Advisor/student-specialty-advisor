import AddVideo from "./Videos Options/AddVideo";

function VideosOptions(props) {
  return (
    <ul className="dashboard-options-list">
      <li>
        <AddVideo />
      </li>
      <li>
        <p>Your component goes here inside the li</p>
      </li>
      <li>
        <p>Your component goes here inside the li</p>
      </li>
    </ul>
  );
}

export default VideosOptions;
