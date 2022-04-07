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
    <div className="advisors-page-container">
      <div className="advisors-about-container">
        <h2> What does an advisor do ?</h2>
        <p>
          Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
          Blah Blah Blah Blah Blah Blah Blah Blah
        </p>
        <h2> Can I be an advisor ?</h2>
        <p>
          Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
          Blah Blah Blah Blah Blah Blah Blah Blah
        </p>
      </div>
      <button>Apply now!</button>
    </div>
  );
}

export default MeetingsAdvisorsList;
/*
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
      </div> */
