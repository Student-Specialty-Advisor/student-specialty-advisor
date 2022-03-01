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
import { Line } from "react-chartjs-2";

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
  const [questionList, setQuestionList] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [results, setResults] = React.useState({});

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
      document.getElementById("n3 text").innerText = "Done Loading :D";
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
        alertify.error("Hey! You forgot to give an answer to this field!");
        break;
      }
    }
    if (answerList.length !== questionList.length) {
      return;
    }
    document.getElementById("quiz-submit-button").disabled = true;
    sendQuizAnswers(answerList)
      .then((result) => {
        if (result.retry) {
          alertify.warning("decisive questions needed");
          document.getElementById("quiz-submit-button").disabled = false;
          return;
        }
        setResults(result);
        setIsSubmitted(true);
        window.scrollTo(0, 0);
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
    console.log(results);
    var array = ["SE", "CSE", "RE"];
    var badSpecialty = array
      .filter((a) => a !== results.result && a !== results.secondResult)
      .map((a) => {
        if (a === "SE") {
          return "Software Engineering";
        } else if (a === "CSE") {
          return "Computer Systems Engineering";
        } else {
          return "Renewable Energy Engineering";
        }
      });

    const graphData = {
      labels: [
        "Software Engineering",
        "Computer Systems Engineering",
        "Renewable Energy Engineering",
      ],
      datasets: [
        {
          data: [results.x, results.z, results.y],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    return (
      <>
        <h1>Your results are in!</h1>
        {results.result === "SE" ? (
          <p>
            The specialty that suits you best would probably be: Software
            Engineering!
          </p>
        ) : null}
        {results.result === "CSE" ? (
          <p>
            The specialty that suits you best would probably be: Computer
            Systems Engineering!
          </p>
        ) : null}
        {results.result === "RE" ? (
          <p>
            The specialty that suits you best would probably be: Renewable
            Energy Engineering!
          </p>
        ) : null}
        {results.secondResult === "SE" ? (
          <p>But we also think Software Engineering could be good for you.</p>
        ) : null}
        {results.secondResult === "CSE" ? (
          <p>
            But we also think Computer Systems Engineering could be good for
            you.
          </p>
        ) : null}
        {results.secondResult === "RE" ? (
          <p>
            But we also think Renewable Energy Engineering could be good for
            you.
          </p>
        ) : null}
        <p>Not {badSpecialty} though! Not that.</p>
        <p>Here is how you scored on our algorithm!</p>
        <div className="quiz-result-graph">
          <Line
            data={graphData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </>
    );
  };

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
        {isSubmitted ? <Results /> : showQuestionList}
        {isSubmitted ? null : (
          <button id="quiz-submit-button" onClick={submit}>
            Submit
          </button>
        )}
      </div>
      <Footer />
    </>
  );
}

export default QuizContainer;
