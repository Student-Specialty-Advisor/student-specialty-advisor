import React from "react";
import AuthService from "../../services/AuthService";

function Statistics() {
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
  };
  React.useEffect(() => {
    getQuizJson();
  }, []);
  return (
    <div>
      <h1>percentage of Software is equal :{percentageSE}</h1>
      <h1>percentage of Hardware is equal :{percentageCSE}</h1>
      <h1>percentage of Renewable is equal :{percentageRE}</h1>
    </div>
  );
}

export default Statistics;
