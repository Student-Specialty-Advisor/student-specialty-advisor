import React from "react";
import AdvisorCard from "./AdvisorCard";
import fetchService from "../../../services/fetchService";
import Footer from "../Footer";
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

  const mappingFunction = (advisor) => {
    return (
      <AdvisorCard
        key={advisor._id}
        fullname={advisor.fullName}
        picture={advisor.imageUrl}
        profession={advisor.profession}
        quote={advisor.quote}
        email={advisor.email}
        linkedin={advisor.linkedinUrl}
      />
    );
  };

  const advisorsSE = advisors.filter((advisor) => {
    return advisor.specialty === "SE";
  });
  const advisorsCSE = advisors.filter((advisor) => {
    return advisor.specialty === "CSE";
  });
  const advisorsREE = advisors.filter((advisor) => {
    return advisor.specialty === "REE";
  });

  return (
    <>
      <div className="about-container-header">
        <h1>Meet the Team!</h1>
        <h4>Get the guidance you need from friends and familiar faces</h4>
      </div>
      <h1 className="meetings-advisors-list-title">
        Software Engineering Advisors
      </h1>
      <div className="meetings-advisors-list">
        <ul>{advisorsSE.map(mappingFunction)}</ul>
      </div>
      <h1 className="meetings-advisors-list-title">
        Computer Systems Engineering
      </h1>
      <div className="meetings-advisors-list">
        <ul>{advisorsCSE.map(mappingFunction)}</ul>
      </div>
      <h1 className="meetings-advisors-list-title">
        Renewable Energy Engineering
      </h1>
      <div className="meetings-advisors-list">
        <ul>{advisorsREE.map(mappingFunction)}</ul>
      </div>
      <Footer />
    </>
  );
}

export default MeetingsAdvisorsList;
