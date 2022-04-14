import fetchService from "../../../../services/fetchService.js";
import alertify from "alertifyjs";
import React from "react";
import {
  StyledButton,
  StyledMenuItem,
  StyledTextField,
} from "../../../Basic Elements/StyledBasicElements.js";

function DeleteAdvisor(props) {
  const [select, setSelect] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleSelectChange = (event) => {
    setSelect(event.target.value);
    if (isDisabled === true) {
      setIsDisabled(false);
    }
  };

  const task = () => {
    fetchService
      .doDelete("meeting/advisors/" + select)
      .then((response) => {
        if (response.success) {
          alertify.success("Advisor was deleted Successfully");
          props.setAdvisorsList();
          props.refresh();
        } else {
          alertify.error(
            "Please try later , an error has occurred while deleting the advisor"
          );
        }
      })
      .catch(() => {
        alertify.error(
          "Please try later , an error has occurred while deleting the advisor"
        );
      });
  };
  const mapping = props.advisorsList.map((advisor) => {
    return (
      <StyledMenuItem key={advisor._id} value={advisor._id}>
        {advisor.fullName}
      </StyledMenuItem>
    );
  });
  return (
    <>
      {props.advisorsList.length === 0 ? (
        <p>
          <strong> There are no advisors in the database yet.</strong>
        </p>
      ) : (
        <>
          <StyledTextField
            select
            size="small"
            label="Advisor"
            value={select}
            onChange={handleSelectChange}
            variant="outlined"
            margin="dense"
            sx={{ width: 225 }}
            helperText="Please select an advisor to delete"
          >
            {mapping}
          </StyledTextField>
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
      )}
    </>
  );
}

export default DeleteAdvisor;
