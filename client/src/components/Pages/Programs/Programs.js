import React from "react";
import { useParams } from "react-router-dom";

function Programs() {
  let { section } = useParams();
  return (
    <h1 style={{ color: "red", fontSize: "60px", marginTop: "200px" }}>
      {section}
    </h1>
  );
}

export default Programs;
