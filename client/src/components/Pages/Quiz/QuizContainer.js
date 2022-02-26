import QuizQuestion from "./QuizQuestion";
import Footer from "../Footer";
import React from "react";

function QuizContainer() {
  const getQuizJson = () => {
    // simulating finished loading
    setTimeout(() => {
      document.getElementById("n1").className = "quiz-transition-end";
      document.getElementById("n2").className = "quiz-transition-end";
      document.getElementById("n3").className = "quiz-transition-end";
      document.getElementById("n4").className = "quiz-transition-end";
      document.getElementById("n5").className = "quiz-transition-end";
      document.getElementById("n6").className = "quiz-transition-end";
    }, 1500);
  };

  React.useEffect(getQuizJson);

  return (
    <>
      <div id="n1" className="quiz-transition-end-waiting"></div>
      <div id="n2" className="quiz-transition-end-waiting"></div>
      <div id="n3" className="quiz-transition-end-waiting">
        <p>Loading the quiz..</p>
      </div>
      <div id="n4" className="quiz-transition-end-waiting"></div>
      <div id="n5" className="quiz-transition-end-waiting"></div>
      <div id="n6" className="quiz-transition-end-waiting"></div>
      <div className="quiz-container">
        <QuizQuestion number="1" multiplier={1} />
        <QuizQuestion number="2" multiplier={1} />
        <QuizQuestion number="3" multiplier={1} />
        <QuizQuestion number="4" multiplier={1} />
        <QuizQuestion number="5" multiplier={1} />
        <QuizQuestion number="6" multiplier={1} />
        <QuizQuestion number="7" multiplier={1} />
        <QuizQuestion number="8" multiplier={1} />
        <button>SUBMIT</button>
      </div>
      <Footer />
    </>
  );
}

export default QuizContainer;
