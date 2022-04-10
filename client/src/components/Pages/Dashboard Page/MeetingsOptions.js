import AddMeeting from "./Meetings Options/AddMeeting";

function MeetingsOptions(props) {
  return (
    <ul className="dashboard-options-list">
      <li>
        <AddMeeting advisorsList={props.advisorsList} />
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

export default MeetingsOptions;
