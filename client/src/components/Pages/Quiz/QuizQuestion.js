function QuizQuestion(props) {
  return (
    <div id={props.id} className="quiz-question">
      <p>{props.question}</p>
      <ul id="text">
        <li>I disagree</li>
        <li>Neutral</li>
        <li>I agree</li>
      </ul>
      <ul id="radio">
        <input name={props.number} value="-2" type="radio"></input>
        <input name={props.number} value="-1" type="radio"></input>
        <input name={props.number} value="0" type="radio"></input>
        <input name={props.number} value="1" type="radio"></input>
        <input name={props.number} value="2" type="radio"></input>
      </ul>
    </div>
  );
}

export default QuizQuestion;
