import fetchService from "../../../../services/fetchService.js";
import alertify from "alertifyjs";
import React, { useRef } from "react";

function DeleteAdvisor(props) {
  const select = useRef();
  const task = () => {
    fetchService
      .doDelete("meeting/advisors/" + select.current.value)
      .then((response) => {
        if (response.success) {
          alertify.success("Advisor was deleted Successfully");
          props.setAdvisorsList();
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
      <option key={advisor._id} value={advisor._id}>
        {advisor.fullName}
      </option>
    );
  });
  return (
    <>
      <h1>Delete Advisor :</h1>
      <select ref={select}>{mapping}</select>
      <button onClick={task}>Submit</button>
    </>
  );
}

export default DeleteAdvisor;
