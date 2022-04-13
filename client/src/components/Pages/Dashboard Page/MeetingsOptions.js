import AddMeeting from "./Meetings Options/AddMeeting";
import DeleteMeeting from "./Meetings Options/DeleteMeeting";

function MeetingsOptions(props) {
  return (
    <ul className="dashboard-options-list">
      <li key="m0">
        <AddMeeting advisorsList={props.advisorsList} />
      </li>
      <li key="m1">
        <DeleteMeeting
          meetingsList={props.meetingsList}
          setMeetingsList={props.setMeetingsList}
        />
      </li>
    </ul>
  );
}

export default MeetingsOptions;
