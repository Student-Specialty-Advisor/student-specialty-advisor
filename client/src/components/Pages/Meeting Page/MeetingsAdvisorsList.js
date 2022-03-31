import React from "react";
import AdvisorCard from "./AdvisorCard";
import testPicture from "../../../assets/art/klouz_white.jpg";

function MeetingsAdvisorsList() {
  React.useEffect(() => {
    document.title = "Meetings - Advisors - Student Specialty Advisor";
  }, []);

  return (
    <>
      <p style={{ fontSize: "16px", position: "absolute" }}>
        TEMPORARY PAGE WITH ADVISOR CARD COMPONENT
      </p>
      <div className="meetings-advisors-list">
        <ul>
          <AdvisorCard
            fullname="Advisor's Name"
            picture={testPicture}
            profession="Senior Student"
            quote="'Quote or smthg qsdq sdq q sd q d qsd qs d qd s'"
            email="https://www.outlook.com"
            linkedin="https://www.linkedin.com/"
          />
        </ul>
      </div>
    </>
  );
}

export default MeetingsAdvisorsList;
