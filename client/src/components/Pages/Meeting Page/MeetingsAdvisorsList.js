import React from "react";
import AdvisorCard from "./AdvisorCard";
import testPicture from "../../../assets/art/klouz_white.jpg";
import fetchService from "../../../services/fetchService";
function MeetingsAdvisorsList() {
  React.useEffect(() => {
    document.title = "Meetings - Advisors - Student Specialty Advisor";
    getAdvisorsList();
  }, []);
  const [advisors, setAdvisors] = React.useState([]);
  const getAdvisorsList = async () => {
    const json = await fetchService.doGET("meeting/advisors");
    setAdvisors(json);
  };
  const advisorList = advisors.map((advisor) => {
    return (
      <AdvisorCard
        fullname={advisor.fullName}
        picture={testPicture}
        profession={advisor.profession}
        quote=""
        email={advisor.email}
        linkedin={advisor.linkedinUrl}
      />
    );
  });

  return (
    <>
      <p style={{ fontSize: "16px", position: "absolute" }}>
        TEMPORARY PAGE WITH ADVISOR CARD COMPONENT
      </p>
      <div className="meetings-advisors-list">
        <ul>{advisorList}</ul>
      </div>
    </>
  );
}

export default MeetingsAdvisorsList;
