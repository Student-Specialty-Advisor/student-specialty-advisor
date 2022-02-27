import QuizQuestion from "./QuizQuestion";
import Footer from "../Footer";
import React from "react";
import AuthService from "../../../services/AuthService";
import alertify from "alertifyjs";

function QuizContainer() {
  const [questionList, setQuestionList] = React.useState([]);

  var showQuestionList = questionList.map((q) => {
    return (
      <QuizQuestion
        id={q.number}
        key={q.number}
        number={q.number}
        question={q.question}
      />
    );
  });

  const getQuizJson = async () => {
    var user = AuthService.getCurrentUser();
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
      document.getElementById("n3 text").innerText = "Loading done :D";
      document.getElementById("n1").className = "quiz-transition-end";
      document.getElementById("n2").className = "quiz-transition-end";
      document.getElementById("n3").className = "quiz-transition-end";
      document.getElementById("n4").className = "quiz-transition-end";
      document.getElementById("n5").className = "quiz-transition-end";
      document.getElementById("n6").className = "quiz-transition-end";
    }
  };

  const sendQuizAnswers = async (data) => {
    var user = AuthService.getCurrentUser();
    const response = await fetch(
      process.env.REACT_APP_API_URL + "quiz-questions",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "x-access-token": user.accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    return json;
  };

  const submit = () => {
    var answerList = [];
    for (var i = 0; i < questionList.length; i++) {
      try {
        var answer = document.querySelector(
          'input[name="' + questionList[i].number + '"]:checked'
        ).value;
        answerList.push(answer);
      } catch (error) {
        document
          .getElementById(questionList[i].number)
          .scrollIntoView({ behavior: "smooth", block: "center" });
        alertify.error("Hey! You forgot to answer to this field!");
        break;
      }
    }
    if (answerList.length !== questionList.length) {
      return;
    }
    sendQuizAnswers(answerList).then((result) => {
      console.log(result);
    });
  };

  React.useEffect(() => {
    getQuizJson();
  }, []);

  return (
    <>
      <div id="n1" className="quiz-transition-end-waiting"></div>
      <div id="n2" className="quiz-transition-end-waiting"></div>
      <div id="n3" className="quiz-transition-end-waiting">
        <p id="n3 text">Loading...</p>
      </div>
      <div id="n4" className="quiz-transition-end-waiting"></div>
      <div id="n5" className="quiz-transition-end-waiting"></div>
      <div id="n6" className="quiz-transition-end-waiting"></div>
      <div className="quiz-container">
        {showQuestionList}
        <button onClick={submit}>Submit</button>
      </div>
      <Footer />
    </>
  );
}

export default QuizContainer;
