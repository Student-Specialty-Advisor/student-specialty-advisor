import React from "react";

function Videos() {
  React.useEffect(() => {
    document.title = "Videos - Student Specialty Advisor";
  }, []);
  return (
    <div>
      <h1>videos displayed here</h1>
    </div>
  );
}

export default Videos;
