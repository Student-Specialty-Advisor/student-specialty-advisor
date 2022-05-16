import React from "react";
import fetchService from "../../../../services/fetchService.js";
import alertify from "alertifyjs";
import {
  StyledTextField,
  StyledMenuItem,
  StyledButton,
} from "../../../Basic Elements/StyledBasicElements.js";

const AddAdvisor = (props) => {
  const fullName = React.useRef();
  const email = React.useRef();
  const profession = React.useRef();
  const [specialty, setSpecialty] = React.useState("");
  const linkedinUrl = React.useRef();
  const imageUrl = React.useRef();
  const quote = React.useRef();
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleSelectChange = (event) => {
    setSpecialty(event.target.value);
  };
  const handleChange = () => {
    if (
      fullName.current.value !== "" &&
      email.current.value !== "" &&
      profession.current.value !== "" &&
      specialty !== "" &&
      linkedinUrl.current.value !== "" &&
      imageUrl.current.value !== "" &&
      quote.current.value !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  React.useEffect(() => {
    if (specialty !== "") {
      if (
        fullName.current.value !== "" &&
        email.current.value !== "" &&
        profession.current.value !== "" &&
        linkedinUrl.current.value !== "" &&
        imageUrl.current.value !== "" &&
        quote.current.value !== ""
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [specialty]);

  const task = () => {
    const data = {
      fullName: fullName.current.value,
      email: email.current.value,
      profession: profession.current.value,
      specialty: specialty,
      linkedinUrl: linkedinUrl.current.value,
      imageUrl: imageUrl.current.value,
      quote: quote.current.value,
    };
    fetchService
      .doPOST("meeting/advisors", data)
      .then((response) => {
        if (response.success) {
          alertify.success("Advisor Added Successfully");
          props.setAdvisorsList();
          props.refresh();
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
          "Please try later , an error has occurred while posting the advisor"
        );
      });
  };
  return (
    <>
      <StyledTextField
        size="small"
        label="Full Name"
        onChange={handleChange}
        inputRef={fullName}
        variant="outlined"
        margin="dense"
      />
      <br />
      <StyledTextField
        size="small"
        label="Email"
        onChange={handleChange}
        inputRef={email}
        variant="outlined"
        margin="dense"
      />
      <br />
      <StyledTextField
        size="small"
        label="Profession"
        onChange={handleChange}
        inputRef={profession}
        variant="outlined"
        margin="dense"
      />
      <br />
      <StyledTextField
        select
        size="small"
        label="Specialty"
        value={specialty}
        onChange={handleSelectChange}
        variant="outlined"
        margin="dense"
        sx={{ width: 225 }}
      >
        <StyledMenuItem value="SE">Software Engineering</StyledMenuItem>
        <StyledMenuItem value="CSE">
          Computer Systems Engineering
        </StyledMenuItem>
        <StyledMenuItem value="REE">
          Renewable Energy Engineering
        </StyledMenuItem>
      </StyledTextField>
      <br />
      <StyledTextField
        size="small"
        label="LinkedIn URL"
        onChange={handleChange}
        inputRef={linkedinUrl}
        variant="outlined"
        margin="dense"
      />
      <br />
      <StyledTextField
        size="small"
        label="Picture URL"
        onChange={handleChange}
        inputRef={imageUrl}
        variant="outlined"
        margin="dense"
      />
      <br />
      <StyledTextField
        size="small"
        label="Quote"
        onChange={handleChange}
        inputRef={quote}
        variant="outlined"
        margin="dense"
      />
      <br />
      <StyledButton
        sx={{ marginTop: "1%" }}
        variant="contained"
        onClick={task}
        disabled={isDisabled}
      >
        Submit
      </StyledButton>
    </>
  );
};

export default AddAdvisor;
