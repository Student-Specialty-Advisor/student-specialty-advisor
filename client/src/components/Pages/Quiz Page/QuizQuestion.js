import React from "react";
import { StyledRadio } from "../../Basic Elements/StyledBasicElements";
function QuizQuestion(props) {
  const [selectedValue, setSelectedValue] = React.useState("");

  const scrollToNext = () => {
    try {
      document
        .getElementById((parseInt(props.id) + 1).toString())
        .scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      return;
    }
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    scrollToNext();
  };
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  React.useEffect(() => {
    if (props.generate === true) {
      setSelectedValue(getRandomIntInclusive(-2, 2).toString());
    }
  }, [props.generate]);

  return (
    <>
      <div id={props.id} className="quiz-question">
        <p>{props.question}</p>
        <ul id="text">
          <li>Strongly disagree</li>
          <li>Disagree</li>
          <li>Neutral</li>
          <li style={{ marginLeft: "2%" }}>Agree</li>
          <li>Strongly agree</li>
        </ul>
      </div>
      <div className="quiz-radio">
        <StyledRadio
          checked={selectedValue === "-2"}
          name={props.number}
          value="-2"
          onChange={handleChange}
        />
        <StyledRadio
          checked={selectedValue === "-1"}
          onChange={handleChange}
          name={props.number}
          value="-1"
        />
        <StyledRadio
          checked={selectedValue === "0"}
          onChange={handleChange}
          name={props.number}
          value="0"
        />
        <StyledRadio
          checked={selectedValue === "1"}
          name={props.number}
          value="1"
          onChange={handleChange}
        />
        <StyledRadio
          checked={selectedValue === "2"}
          name={props.number}
          value="2"
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default QuizQuestion;
