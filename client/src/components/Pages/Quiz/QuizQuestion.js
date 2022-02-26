function QuizQuestion(props) {
  return (
    <div className="quiz-question">
      <p>
        Question dsqd sd sdqqsd qsdqsd qsdqsdqs qsdqsdqs qsdqsdqs qsdqdsq
        sqdsqdqsdqsd sqdqsdqsdqqsqs qsdqsdqsdqsdqsdqsdqsdqs qsdqsdq qsd.
      </p>
      <ul id="text">
        <li>I disagree</li>
        <li>Neutral</li>
        <li>I agree</li>
      </ul>
      <ul id="radio">
        <input
          name={props.number}
          value={-2 * props.multiplier}
          type="radio"
        ></input>
        <input
          name={props.number}
          value={-1 * props.multiplier}
          type="radio"
        ></input>
        <input name={props.number} value={0} type="radio"></input>
        <input
          name={props.number}
          value={1 * props.multiplier}
          type="radio"
        ></input>
        <input
          name={props.number}
          value={2 * props.multiplier}
          type="radio"
        ></input>
      </ul>
    </div>
  );
}

export default QuizQuestion;
