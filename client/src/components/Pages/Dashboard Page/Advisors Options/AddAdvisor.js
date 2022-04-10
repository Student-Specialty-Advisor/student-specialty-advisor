import React from "react";
import fetchService from "../../../../services/fetchService.js";
import alertify from "alertifyjs";

const AddAdvisor = () => {
  const fullName = React.useRef();
  const email = React.useRef();
  const profession = React.useRef();
  const specialty = React.useRef();
  const linkedinUrl = React.useRef();
  const imageUrl = React.useRef();
  const quote = React.useRef();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const handleChange = () => {
    if (
      fullName.current.value !== "" &&
      email.current.value !== "" &&
      profession.current.value !== "" &&
      specialty.current.value !== "" &&
      linkedinUrl.current.value !== "" &&
      imageUrl.current.value !== "" &&
      quote.current.value !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const task = () => {
    const data = {
      fullName: fullName.current.value,
      email: email.current.value,
      profession: profession.current.value,
      specialty: specialty.current.value,
      linkedinUrl: linkedinUrl.current.value,
      imageUrl: imageUrl.current.value,
      quote: quote.current.value,
    };
    fetchService
      .doPOST("meeting/advisors", data)
      .then((response) => {
        if (response.success) {
          alertify.success("Advisor Added Successfully");
        } else {
          alertify.warning(
            "Please re-type the " + Object.keys(response.errorObject.keyPattern)
          );
        }
      })
      .catch(() => {
        alertify.error(
          "Please try later , an error has occurred while posting the advisor"
        );
      });
  };
  return (
    <>
      <h1>Add Advisor : </h1>
      <label>Full Name :</label>
      <br />
      <input
        placeholder="Full Name"
        type="text"
        id="fullName"
        onChange={handleChange}
        ref={fullName}
      ></input>
      <br />
      <label>Email :</label>
      <br />
      <input
        placeholder="Email"
        type="text"
        id="email"
        onChange={handleChange}
        ref={email}
      ></input>
      <br />
      <label>Profession :</label>
      <br />
      <input
        placeholder="Profession"
        type="text"
        id="profession"
        onChange={handleChange}
        ref={profession}
      ></input>
      <br />
      <label>Specialty :</label>
      <br />
      <input
        placeholder="Specialty"
        type="text"
        id="specialty"
        onChange={handleChange}
        ref={specialty}
      ></input>
      <br />
      <label>Linkedin Url :</label>
      <br />
      <input
        placeholder="Linkedin Url"
        type="text"
        id="linkedinUrl"
        onChange={handleChange}
        ref={linkedinUrl}
      ></input>
      <br />
      <label>Image Url :</label>
      <br />
      <input
        placeholder="Image Url"
        type="text"
        id="imageUrl"
        onChange={handleChange}
        ref={imageUrl}
      ></input>
      <br />
      <label>Quote :</label>
      <br />
      <input
        placeholder="Quote"
        type="text"
        id="quote"
        onChange={handleChange}
        ref={quote}
      ></input>
      <br />
      <button onClick={task} disabled={isDisabled} id="button">
        Submit
      </button>
    </>
  );
};

export default AddAdvisor;
