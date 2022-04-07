import React from "react";
import fetchService from "../../../services/fetchService";
import Footer from "../Footer";
import MeetingsRequestPopup from "./MeetingsRequestPopup";

function MeetingsRequest() {
  React.useEffect(() => {
    document.title = "Meetings - Request - Student Specialty Advisor";
  }, []);

  // schedule represents the 9 rows x 6 cols table: schedule[row][col]: schedule[0][2] => 8 am | Wednesday
  const [schedule, setSchedule] = React.useState([
    Array(6),
    Array(6),
    Array(6),
    Array(6),
    Array(6),
    Array(6),
    Array(6),
    Array(6),
    Array(6),
  ]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [popupIsShown, setPopupIsShown] = React.useState(false);
  const [popupShowNext, setPopupShowNext] = React.useState(false);
  const [popupInfo, setPopupInfo] = React.useState({
    col: 0,
    name: "",
    specialty: "",
  });

  const fetchSchedule = () => {
    fetchService
      .doGET("meeting/schedule")
      .then((response) => {
        if (response.success) {
          var array = [
            Array(6).fill(""),
            Array(6).fill(""),
            Array(6).fill(""),
            Array(6).fill(""),
            Array(6).fill(""),
            Array(6).fill(""),
            Array(6).fill(""),
            Array(6).fill(""),
            Array(6).fill(""),
          ];
          for (var i = 0; i < response.meetings.length; i++) {
            array[response.meetings[i].row][response.meetings[i].col] =
              response.meetings[i];
          }
          setSchedule(array);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const mapFunction = (element, col, row) => {
    if (element === "") {
      return (
        <td
          key={"r" + row + "c" + col}
          id={"r" + row + "c" + col}
          onClick={() => {
            setPopupIsShown(false);
            setPopupShowNext(false);
          }}
        ></td>
      );
    } else {
      return (
        <td
          key={"r" + row + "c" + col}
          id={"r" + row + "c" + col}
          className="has-meeting"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>
              Advisor's Name:
              <br />
              <strong>{element.advisorName}</strong>
            </p>
            <p>
              Specialty: <strong>{element.specialty}</strong>
            </p>
            <button
              onClick={() => {
                setPopupShowNext(false);
                setPopupInfo({
                  col: col,
                  name: element.advisorName,
                  specialty: element.specialty,
                });
                document
                  .getElementById("r" + row + "c" + col)
                  .appendChild(
                    document.getElementById("meetings-request-popup")
                  );
                setPopupIsShown(true);
              }}
            >
              Request Meeting
            </button>
          </div>
        </td>
      );
    }
  };

  //#region rows
  const row0 = schedule[0].map((e, index) => {
    return mapFunction(e, index, 0);
  });
  const row1 = schedule[1].map((e, index) => {
    return mapFunction(e, index, 1);
  });
  const row2 = schedule[2].map((e, index) => {
    return mapFunction(e, index, 2);
  });
  const row3 = schedule[3].map((e, index) => {
    return mapFunction(e, index, 3);
  });
  const row4 = schedule[4].map((e, index) => {
    return mapFunction(e, index, 4);
  });
  const row5 = schedule[5].map((e, index) => {
    return mapFunction(e, index, 5);
  });
  const row6 = schedule[6].map((e, index) => {
    return mapFunction(e, index, 6);
  });
  const row7 = schedule[7].map((e, index) => {
    return mapFunction(e, index, 7);
  });
  const row8 = schedule[8].map((e, index) => {
    return mapFunction(e, index, 8);
  });
  //#endregion rows

  React.useEffect(fetchSchedule, []);

  return (
    <div className="meetings-request-container">
      <h1 className="meetings-request-title">Current Meetings Schedule</h1>
      {isLoaded ? (
        <>
          <table className="meetings-request-table">
            <thead>
              <tr>
                <th></th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>8:00 am</th>
                {row0}
              </tr>
              <tr>
                <th>9:00 am</th>
                {row1}
              </tr>
              <tr>
                <th>10:00 am</th>
                {row2}
              </tr>
              <tr>
                <th>11:00 am</th>
                {row3}
              </tr>
              <tr>
                <th>12:00 pm</th>
                {row4}
              </tr>
              <tr>
                <th>1:00 pm</th>
                {row5}
              </tr>
              <tr>
                <th>2:00 pm</th>
                {row6}
              </tr>
              <tr>
                <th>3:00 pm</th>
                {row7}
              </tr>
              <tr>
                <th>4:00 pm</th>
                {row8}
              </tr>
            </tbody>
          </table>
          <MeetingsRequestPopup
            isShown={popupIsShown}
            showNext={popupShowNext}
            setShowNext={setPopupShowNext}
            info={popupInfo}
          />
          <Footer />
        </>
      ) : (
        <>
          <div>
            <p>Loading</p>
          </div>
        </>
      )}
    </div>
  );
}

export default MeetingsRequest;
