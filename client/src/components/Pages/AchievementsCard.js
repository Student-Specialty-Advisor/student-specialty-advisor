import React from "react";
import { Card } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function AchievementsCard(props) {
  const card = (
    <Card
      variant="outlined"
      sx={{
        width: "30%",
        marginBottom: "3%",
        height: "15vh",
        background: "white",
        boxShadow: "0px 0px 5px 1px",
        borderRadius: "25px",
        position: "relative",
      }}
    >
      {props.isCompleted ? (
        <>
          <h1
            style={{
              textAlign: "left",
              color: "var(--mydarkerblue)",
              marginTop: "0",
              marginLeft: "5%",
            }}
          >
            {props.title}
          </h1>
          <CheckCircleIcon
            sx={{
              position: "absolute",
              top: "3%",
              right: "2%",
              color: "green",
              fontSize: 35,
            }}
          />
          <p
            style={{
              textAlign: "left",
              color: "var(--mydarkblue)",
              marginLeft: "5%",
            }}
          >
            {props.description}
          </p>
        </>
      ) : (
        <QuestionMarkIcon
          sx={{
            position: "absolute",
            fontSize: 100,
            top: "5%",
            right: "35%",
            color: "var(--mydarkerblue)",
          }}
        />
      )}
    </Card>
  );
  return <>{card}</>;
}

export default AchievementsCard;
