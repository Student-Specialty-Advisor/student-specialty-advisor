import AddMeeting from "./Meetings Options/AddMeeting";

function MeetingsOptions(props) {
  return (
    <ul className="dashboard-options-list">
      <li key="m0">
        <AddMeeting advisorsList={props.advisorsList} />
      </li>
      <li key="m1">
        <p>Your component goes here inside the li</p>
      </li>
    </ul>
  );
}

export default MeetingsOptions;
