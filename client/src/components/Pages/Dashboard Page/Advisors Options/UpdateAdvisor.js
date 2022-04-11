import React from "react";
import fetchService from "../../../../services/fetchService";
import alertify from "alertifyjs";
const UpdateAdvisor = (props) => {
  const fullName = React.useRef();
  const email = React.useRef();
  const profession = React.useRef();
  const specialty = React.useRef();
  const linkedinUrl = React.useRef();
  const imageUrl = React.useRef();
  const quote = React.useRef();
  const select = React.useRef();
  const [isHidden, setIsHidden] = React.useState(true);
  const [currentAdvisor, setCurrentAdvisor] = React.useState({});

  const task = () => {
    const json = {};
    if (fullName.current.value !== "") {
      json.fullName = fullName.current.value;
    }
    if (email.current.value !== "") {
      json.email = email.current.value;
    }
    if (profession.current.value !== "") {
      json.profession = profession.current.value;
    }
    if (specialty.current.value !== "") {
      json.specialty = specialty.current.value;
    }
    if (linkedinUrl.current.value !== "") {
      json.linkedinUrl = linkedinUrl.current.value;
    }
    if (imageUrl.current.value !== "") {
      json.imageUrl = imageUrl.current.value;
    }
    if (quote.current.value !== "") {
      json.quote = quote.current.value;
    }
    fetchService
      .doPUT(
        "meeting/advisors/" + props.advisorsList[select.current.value]._id,
        json
      )
      .then((response) => {
        if (response.success) {
          alertify.success("Advisor was updated Successfully");
          props.setAdvisorsList();
        } else {
          alertify.warning(
            "An Advisor with this " +
              Object.keys(response.errorObject.keyPattern) +
              " already exists"
          );
        }
      })
      .catch(() => {
        alertify.error(
          "Please try later , an error has occurred while updating the advisor"
        );
      });
  };
  const mapping = props.advisorsList.map((advisor, index) => {
    return (
      <option value={index} key={index}>
        {advisor.fullName}
      </option>
    );
  });

  return (
    <>
      <h1>Update An Advisor : </h1>
      <select
        onChange={() => {
          setCurrentAdvisor(props.advisorsList[select.current.value]);
          setIsHidden(false);
        }}
        ref={select}
      >
        <option hidden disabled selected value>
          Select An Advisor
        </option>
        {mapping}
      </select>
      <br />
      <br />
      <br />
      {isHidden === true ? null : (
        <>
          <label>Full Name :</label>
          <br />
          <input
            placeholder={currentAdvisor.fullName}
            type="text"
            ref={fullName}
          ></input>
          <br />
          <label>Email :</label>
          <br />
          <input
            placeholder={currentAdvisor.email}
            type="text"
            ref={email}
          ></input>
          <br />
          <label>Profession :</label>
          <br />
          <input
            placeholder={currentAdvisor.profession}
            type="text"
            ref={profession}
          ></input>
          <br />
          <label>Specialty :</label>
          <br />
          <select ref={specialty}>
            <option value="SE">Software Engineering</option>
            <option value="CSE">Computer Systems Engineering</option>
            <option value="REE">Renewable Energy Engineering</option>
          </select>
          <br />
          <label>Linkedin Url :</label>
          <br />
          <input
            placeholder={currentAdvisor.linkedinUrl}
            type="text"
            ref={linkedinUrl}
          ></input>
          <br />
          <label>Image Url :</label>
          <br />
          <input
            placeholder={currentAdvisor.imageUrl}
            type="text"
            ref={imageUrl}
          ></input>
          <br />
          <label>Quote :</label>
          <br />
          <input
            placeholder={currentAdvisor.quote}
            type="text"
            ref={quote}
          ></input>
          <br />
          <button onClick={task}>Submit</button>
        </>
      )}
    </>
  );
};

export default UpdateAdvisor;
