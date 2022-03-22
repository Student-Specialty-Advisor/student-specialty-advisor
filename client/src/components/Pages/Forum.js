import React from "react";

function Forum() {
  React.useEffect(() => {
    document.title = "Community Forum - Student Specialty Advisor";
  }, []);
  return (
    <div>
      <h1>
        Forum for students to express opinions and experiences with certain
        topics
      </h1>
    </div>
  );
}

export default Forum;
