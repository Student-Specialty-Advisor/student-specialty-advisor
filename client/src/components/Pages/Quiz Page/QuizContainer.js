import QuizQuestion from "./QuizQuestion";
import Footer from "../Footer";
import React from "react";
import AuthService from "../../../services/AuthService";
import alertify from "alertifyjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import fetchService from "../../../services/fetchService";
import { completeAchievement } from "../../../services/achievements";
import { CircularProgress } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function QuizContainer() {
  React.useEffect(() => {
    document.title = "Program Compatibility Quiz - Student Specialty Advisor";
  }, []);

  const [questionList, setQuestionList] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isGenerated, setIsGenerated] = React.useState(false);
  const [results, setResults] = React.useState({});
  const [showCircularProgress, setShowCircularProgress] = React.useState(false);

  var isAdmin = AuthService.isAdmin();

  var showQuestionList = questionList.map((q) => {
    return (
      <QuizQuestion
        id={q.number}
        key={q.number}
        number={q.number}
        question={q.question}
        generate={isGenerated}
      />
    );
  });

  const getSpecialtyName = (specialty) => {
    switch (specialty) {
      case "RE":
        return " Renewable Energy Engineering";
      case "SE":
        return " Software Engineering";
      case "CSE":
        return " Computer systems Engineering";
      default:
        return "Unknown";
    }
  };

  const getQuizJson = async () => {
    const json = await fetchService.doGET("quiz-questions");
    if (json.error) {
      document.getElementById("n3 text").innerText =
        "Error while retrieving quiz :( Try refreshing the page.";
    } else {
      setQuestionList(json);
      document.getElementById("n3 text").innerText = "Done Loading :D";
      document.getElementById("n1").className = "quiz-transition-end";
      document.getElementById("n2").className = "quiz-transition-end";
      document.getElementById("n3").className = "quiz-transition-end";
      document.getElementById("n4").className = "quiz-transition-end";
      document.getElementById("n5").className = "quiz-transition-end";
      document.getElementById("n6").className = "quiz-transition-end";
    }
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
        alertify.error("Hey! You forgot to give an answer to this field!");
        break;
      }
    }
    if (answerList.length !== questionList.length) {
      return;
    }
    document.getElementById("quiz-submit-button").disabled = true;
    fetchService
      .doPOST("quiz-questions", answerList)
      .then((result) => {
        if (result.retry) {
          alertify.warning(
            "Oops! Looks like we need you to answer questions more accurately to be able to handle this one!"
          );
          document.getElementById("quiz-submit-button").disabled = false;
          return;
        }
        if (result.tokenError) {
          AuthService.alertifyInvalidToken();
          return;
        }
        setResults(result);
        setIsSubmitted(true);
        window.scrollTo(0, 0);
        completeAchievement("quizCompletion", "Program Compatibility Quiz");
      })
      .catch((error) => {
        console.log(error);
        alertify.error(
          "Something went wrong when submitting your answers. Try again in a few seconds."
        );
        document.getElementById("quiz-submit-button").disabled = false;
      });
  };

  const Results = () => {
    return (
      <>
        <h1>Your results are in!</h1>
        <p>
          The specialty that suits you best would probably be:
          <strong>{getSpecialtyName(results.result)}!</strong>
        </p>
        <a
          href={`http://localhost:3000/programs/${results.result.toLowerCase()}/overview`}
          target="_blank"
          rel="noreferrer noopener"
        >
          More about {getSpecialtyName(results.result)}↗
        </a>
        <p>
          But we also think that
          <strong>{getSpecialtyName(results.secondResult)}</strong> could be
          good for you.
        </p>
        <a
          href={`http://localhost:3000/programs/${results.secondResult.toLowerCase()}/overview`}
          target="_blank"
          rel="noreferrer noopener"
        >
          More about {getSpecialtyName(results.secondResult)}↗
        </a>

        <button
          onClick={() => {
            window.scrollTo(0, 0);
            window.location.reload();
          }}
        >
          Retake the quiz
        </button>
      </>
    );
  };

  const generateAnswers = () => {
    // Admin only function
    setShowCircularProgress(true);
    setIsGenerated(true);
  };

  React.useEffect(() => {
    if (isGenerated === true) {
      document
        .getElementById("quiz-submit-button")
        .scrollIntoView({ behavior: "smooth", block: "center" });
      setIsGenerated(false);
      setShowCircularProgress(false);
    }
  }, [isGenerated]);

  React.useEffect(() => {
    getQuizJson();
  }, []);

  return (
    <>
      {isSubmitted ? null : (
        <>
          <div id="n1" className="quiz-transition-end-waiting"></div>
          <div id="n2" className="quiz-transition-end-waiting"></div>
          <div id="n3" className="quiz-transition-end-waiting">
            <p id="n3 text">Loading...</p>
          </div>
          <div id="n4" className="quiz-transition-end-waiting"></div>
          <div id="n5" className="quiz-transition-end-waiting"></div>
          <div id="n6" className="quiz-transition-end-waiting"></div>
        </>
      )}
      <div className="quiz-container">
        {isSubmitted ? null : isAdmin ? (
          <>
            <button
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onClick={generateAnswers}
            >
              Generate Answers
              {showCircularProgress ? (
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  sx={{ margin: "auto", marginTop: "5%" }}
                />
              ) : null}
            </button>
          </>
        ) : null}
        {isSubmitted ? <Results /> : showQuestionList}
        {isSubmitted ? null : (
          <button id="quiz-submit-button" onClick={submit}>
            Submit
          </button>
        )}
      </div>
      <Footer id="no-margin" />
    </>
  );
}

export default QuizContainer;
