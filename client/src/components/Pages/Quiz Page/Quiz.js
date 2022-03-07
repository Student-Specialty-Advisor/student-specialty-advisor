import React from "react";
import Footer from "../Footer";

function Quiz(props) {
  React.useEffect(() => {
    document.title = "Personality Quiz - Student Specialty Advisor";
  }, []);

  return (
    <>
      <div id="n1"></div>
      <div id="n2"></div>
      <div id="n3"></div>
      <div id="n4"></div>
      <div id="n5"></div>
      <div id="n6"></div>
      <div className="quiz-intro">
        <h1>Welcome to Personality Quiz!</h1>
        <p id="subtitle">
          Your starting point to determine which MedTech engineering program may
          be the right fit for you!
        </p>
        <p id="desc">
          In this section below, you will undergo a series of questions that
          will help shape the end result: The field you are most likely
          compatible with.
          <br />
          Please consider submitting valid and sincere answers in order to get
          the most accurate results.
          <br /> <br /> <br />
          By using this quiz, you agree to the anonymous collection of your
          answers. Your submission will be confidential, will only be used for
          statistic research purposes and will not be shared. The data enables
          us to perform more accurate adjustments to provide the best quality of
          tests.
        </p>
        <br />
        <button
          id="start-button"
          onClick={() => {
            document.getElementById("start-button").disabled = true;
            var lastOne = document.getElementById("n6");
            document.getElementById("n1").className = "quiz-transition-start";
            document.getElementById("n2").className = "quiz-transition-start";
            document.getElementById("n3").className = "quiz-transition-start";
            document.getElementById("n4").className = "quiz-transition-start";
            document.getElementById("n5").className = "quiz-transition-start";
            document.getElementById("n6").className = "quiz-transition-start";
            lastOne.addEventListener("animationend", function () {
              props.history.push("/quiz/started");
              window.scrollTo(0, 0);
            });
          }}
        >
          Start Quiz
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Quiz;
