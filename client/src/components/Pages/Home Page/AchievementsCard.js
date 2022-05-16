import React from "react";
import { Card } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function AchievementsCard(props) {
  const card = (
    <Card className="achievement-card" variant="outlined">
      {props.isCompleted ? (
        <>
          <div
            style={{
              height: "90%",
              width: "85%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "10%",
            }}
          >
            <h1>{props.title}</h1>
            <p>{props.description}</p>
          </div>
          <CheckCircleIcon
            sx={{
              position: "absolute",
              top: "5.5%",
              right: "2%",
              color: "green",
              fontSize: 35,
            }}
          />
        </>
      ) : (
        <QuestionMarkIcon className="question-mark-icon" />
      )}
    </Card>
  );
  return <>{card}</>;
}

export default AchievementsCard;
