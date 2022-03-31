import React from "react";
import AdvisorCard from "./AdvisorCard";

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
            profession="Senior Student"
            quote="'Quote or smthg qsdq sdq q sd q d qsd qs d qd s'"
          />
          <AdvisorCard
            fullname="Advisor"
            profession="Profession"
            quote="'Quote or smthg'"
          />
          <AdvisorCard
            fullname="Advisor"
            profession="Profession"
            quote="'Quote or smthg'"
          />
          <AdvisorCard
            fullname="Advisor"
            profession="Profession"
            quote="'Quote or smthg'"
          />
          <AdvisorCard
            fullname="Advisor"
            profession="Profession"
            quote="'Quote or smthg'"
          />
          <AdvisorCard
            fullname="Advisor"
            profession="Profession"
            quote="'Quote or smthg'"
          />
        </ul>
      </div>
    </>
  );
}

export default MeetingsAdvisorsList;
