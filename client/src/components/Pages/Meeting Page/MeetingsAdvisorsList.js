import React from "react";
import AdvisorCard from "./AdvisorCard";
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
        picture={advisor.imageUrl}
        profession={advisor.profession}
        quote={advisor.quote}
        email={advisor.email}
        linkedin={advisor.linkedinUrl}
      />
    );
  });

  return (
    <>
      <div className="meetings-advisors-list">
        <ul>{advisorList}</ul>
      </div>
    </>
  );
}

export default MeetingsAdvisorsList;
