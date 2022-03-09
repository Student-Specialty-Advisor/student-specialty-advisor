import React from "react";

function Programs() {
  React.useEffect(() => {
    document.title = "Programs - Student Specialty Advisor";
  }, []);
  return (
    <div>
      <h1>
        here you may be able to see what are the presented courses for each year
      </h1>
    </div>
  );
}

export default Programs;
