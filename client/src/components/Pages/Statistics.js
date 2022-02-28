import React from "react";
import AuthService from "../../services/AuthService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, Title);
function Statistics() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [percentageSE, setPercentageSE] = React.useState(null);
  const [percentageCSE, setPercentageCSE] = React.useState(null);
  const [percentageRE, setPercentageRE] = React.useState(null);
  const getQuizJson = async () => {
    var user = AuthService.getCurrentUser();
    const response = await fetch(process.env.REACT_APP_API_URL + "statistics", {
      method: "GET",
      headers: {
        "x-access-token": user.accessToken,
      },
    });
    const json = await response.json();
    setPercentageSE(json.percentageSE);
    setPercentageCSE(json.percentageCSE);
    setPercentageRE(json.percentageRE);
    setIsLoaded(true);
  };
  const data = {
    labels: [
      "Software Engineering",
      "Computer Science Engineering",
      "Renewable Energy Engineering",
    ],
    datasets: [
      {
        data: [percentageSE, percentageCSE, percentageRE],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };
  React.useEffect(() => {
    getQuizJson();
  }, []);
  return (
    <div>
      {!isLoaded ? (
        <h1>Graph is loading ...</h1>
      ) : (
        <Doughnut
          data={data}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "Personality Quiz Statistics",
                position: "top",
                padding: 50,
                font: { size: 20 },
              },
              legend: { position: "bottom" },
            },
          }}
          width={400}
          height={500}
        />
      )}
    </div>
  );
}

export default Statistics;
