import React from "react";
import fetchService from "../../../../services/fetchService";
import alertify from "alertifyjs";
import {
  StyledButton,
  StyledMenuItem,
  StyledTextField,
} from "../../../Basic Elements/StyledBasicElements";
const UpdateAdvisor = (props) => {
  const fullName = React.useRef();
  const email = React.useRef();
  const profession = React.useRef();
  const [specialty, setSpecialty] = React.useState("");
  const linkedinUrl = React.useRef();
  const imageUrl = React.useRef();
  const quote = React.useRef();
  const [select, setSelect] = React.useState("");
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
    if (specialty !== "") {
      json.specialty = specialty;
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
      .doPUT("meeting/advisors/" + props.advisorsList[select]._id, json)
      .then((response) => {
        if (response.success) {
          alertify.success("Advisor was updated Successfully");
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
          "Please try later , an error has occurred while updating the advisor"
        );
      });
  };
  const mapping = props.advisorsList.map((advisor, index) => {
    return (
      <StyledMenuItem value={index} key={index}>
        {advisor.fullName}
      </StyledMenuItem>
    );
  });

  React.useEffect(() => {
    if (select !== "") {
      setCurrentAdvisor(props.advisorsList[select]);
      setSpecialty(props.advisorsList[select].specialty);
      setIsHidden(false);
    }
  }, [select, props.advisorsList]);

  return (
    <>
      <p>Only the fields that you change are going to be updated</p>
      <StyledTextField
        select
        size="small"
        label="Advisor"
        value={select}
        onChange={(event) => {
          setSelect(event.target.value);
        }}
        variant="outlined"
        margin="dense"
        sx={{ width: 225 }}
        helperText="Please select an advisor to update"
      >
        {mapping}
      </StyledTextField>
      {isHidden === true ? null : (
        <div key={currentAdvisor._id}>
          <br />
          <StyledTextField
            size="small"
            label="Full Name"
            inputRef={fullName}
            variant="outlined"
            margin="dense"
            defaultValue={currentAdvisor.fullName}
          />
          <br />
          <StyledTextField
            size="small"
            label="Email"
            inputRef={email}
            variant="outlined"
            margin="dense"
            defaultValue={currentAdvisor.email}
          />
          <br />
          <StyledTextField
            size="small"
            label="Profession"
            inputRef={profession}
            variant="outlined"
            margin="dense"
            defaultValue={currentAdvisor.profession}
          />
          <br />
          <StyledTextField
            select
            size="small"
            label="Specialty"
            value={specialty}
            onChange={(event) => {
              setSpecialty(event.target.value);
            }}
            variant="outlined"
            margin="dense"
            helperText="The initially selected specialty is the currently assigned one."
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
            inputRef={linkedinUrl}
            variant="outlined"
            margin="dense"
            defaultValue={currentAdvisor.linkedinUrl}
          />
          <br />
          <StyledTextField
            size="small"
            label="Picture URL"
            inputRef={imageUrl}
            variant="outlined"
            margin="dense"
            defaultValue={currentAdvisor.imageUrl}
          />
          <br />
          <StyledTextField
            size="small"
            label="Quote"
            inputRef={quote}
            variant="outlined"
            margin="dense"
            defaultValue={currentAdvisor.quote}
          />
          <br />
          <StyledButton
            sx={{ marginTop: "1%" }}
            variant="contained"
            onClick={task}
          >
            Submit
          </StyledButton>
        </div>
      )}
    </>
  );
};

export default UpdateAdvisor;
