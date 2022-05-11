import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import fetchService from "../../../services/fetchService";
import Loading from "../../Loading";
import { useMediaQuery } from "@mui/material";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

function Statistics() {
  React.useEffect(() => {
    document.title = "Statistics - Student Specialty Advisor";
  }, []);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [percentageSE, setPercentageSE] = React.useState(null);
  const [percentageCSE, setPercentageCSE] = React.useState(null);
  const [percentageRE, setPercentageRE] = React.useState(null);
  const [total, setTotal] = React.useState(null);
  const [countSE, setCountSE] = React.useState(null);
  const [countCSE, setCountCSE] = React.useState(null);
  const [countRE, setCountRE] = React.useState(null);
  const isMobile = useMediaQuery("(max-width:480px)");

  const getQuizJson = async () => {
    const json = await fetchService.doGET("statistics");
    setPercentageSE(json.percentageSE);
    setPercentageCSE(json.percentageCSE);
    setPercentageRE(json.percentageRE);
    setTotal(json.total);
    setCountSE(json.countSE);
    setCountCSE(json.countCSE);
    setCountRE(json.countRE);
    setIsLoaded(true);
  };

  const percentageData = {
    labels: [
      "Software Engineering",
      "Computer Science Engineering",
      "Renewable Energy Engineering",
    ],
    datasets: [
      {
        data: [percentageSE, percentageCSE, percentageRE],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
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

  const countData = {
    labels: [
      "Total",
      "Software Engineering",
      "Computer Science Engineering",
      "Renewable Energy Engineering",
    ],
    datasets: [
      {
        data: [total, countSE, countCSE, countRE],
        backgroundColor: [
          "rgba(0, 0, 40, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
        borderColor: [
          "rgba(0, 0, 40, 1)",
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
  return !isLoaded ? (
    <>
      <Loading overrideStyle={{ marginTop: "30vh" }} />
    </>
  ) : (
    <>
      <div className="statistics-loaded">
        <div>
          <Doughnut
            data={percentageData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Program Compatibility Quiz Results in %",
                  position: "top",
                  padding: 20,
                  font: { size: isMobile ? 15 : 20 },
                },
                legend: {
                  position: "bottom",
                  labels: {
                    padding: 40,
                  },
                },
              },
            }}
            height="400px"
          />
        </div>
        <div>
          <Bar
            data={countData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                title: {
                  display: true,
                  text: "Program Compatibility Quiz Results in numbers",
                  position: "top",
                  padding: 20,
                  font: { size: isMobile ? 15 : 20 },
                },
                legend: {
                  display: false,
                },
              },
            }}
            height="400px"
          />
        </div>
      </div>
    </>
  );
}

export default Statistics;
