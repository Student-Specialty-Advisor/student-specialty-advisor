import QuizQuestion from "./QuizQuestion";
import Footer from "../Footer";
import React from "react";
import AuthService from "../../../services/AuthService";

function QuizContainer() {
  const [questionList, setQuestionList] = React.useState([]);

  var showQuestionList = questionList.map((q) => {
    return (
      <QuizQuestion key={q.number} number={q.number} question={q.question} />
    );
  });

  const getQuizJson = async () => {
    var user = AuthService.getCurrentUser();
    console.log("called");
    const response = await fetch(
      process.env.REACT_APP_API_URL + "quiz-questions",
      {
        method: "GET",
        headers: {
          "x-access-token": user.accessToken,
        },
      }
    );
    const json = await response.json();
    if (json.error) {
      document.getElementById("n3 text").innerText =
        "Error while retrieving quiz :( Try refreshing the page.";
    } else {
      setQuestionList(json);
      document.getElementById("n1").className = "quiz-transition-end";
      document.getElementById("n2").className = "quiz-transition-end";
      document.getElementById("n3").className = "quiz-transition-end";
      document.getElementById("n4").className = "quiz-transition-end";
      document.getElementById("n5").className = "quiz-transition-end";
      document.getElementById("n6").className = "quiz-transition-end";
    }
  };

  React.useEffect(() => {
    getQuizJson();
  }, []);

  return (
    <>
      <div id="n1" className="quiz-transition-end-waiting"></div>
      <div id="n2" className="quiz-transition-end-waiting"></div>
      <div id="n3" className="quiz-transition-end-waiting">
        <p id="n3 text">Loading the quiz..</p>
      </div>
      <div id="n4" className="quiz-transition-end-waiting"></div>
      <div id="n5" className="quiz-transition-end-waiting"></div>
      <div id="n6" className="quiz-transition-end-waiting"></div>
      <div className="quiz-container">
        {showQuestionList}
        <button>Submit</button>
      </div>
      <Footer />
    </>
  );
}

export default QuizContainer;
