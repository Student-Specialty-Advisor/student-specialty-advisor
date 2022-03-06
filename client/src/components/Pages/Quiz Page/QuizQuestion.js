function QuizQuestion(props) {
  const scrollToNext = () => {
    try {
      document
        .getElementById((parseInt(props.id) + 1).toString())
        .scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (error) {
      return;
    }
  };

  return (
    <div id={props.id} className="quiz-question">
      <p>{props.question}</p>
      <ul id="text">
        <li>I disagree</li>
        <li>Neutral</li>
        <li>I agree</li>
      </ul>
      <ul id="radio">
        <input
          onClick={scrollToNext}
          name={props.number}
          value="-2"
          type="radio"
        ></input>
        <input
          onClick={scrollToNext}
          name={props.number}
          value="-1"
          type="radio"
        ></input>
        <input
          onClick={scrollToNext}
          name={props.number}
          value="0"
          type="radio"
        ></input>
        <input
          onClick={scrollToNext}
          name={props.number}
          value="1"
          type="radio"
        ></input>
        <input
          onClick={scrollToNext}
          name={props.number}
          value="2"
          type="radio"
        ></input>
      </ul>
    </div>
  );
}

export default QuizQuestion;
