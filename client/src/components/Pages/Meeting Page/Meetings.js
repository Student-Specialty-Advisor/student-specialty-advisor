import React from "react";

function Meetings() {
  React.useEffect(() => {
    document.title = "Meetings - Student Specialty Advisor";
  }, []);
  return (
    <div>
      <h1>You can request meetings and view advisors here</h1>
    </div>
  );
}

export default Meetings;