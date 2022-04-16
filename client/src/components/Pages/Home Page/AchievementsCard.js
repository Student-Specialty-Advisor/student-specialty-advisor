import React from "react";
import { Card } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function AchievementsCard(props) {
  const card = (
    <Card
      className="achievement-card"
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "30%",
        marginBottom: "3%",
        background: "white",
        border: "solid var(--mydarkerblue)",
        borderRadius: "25px",
        position: "relative",
      }}
    >
      {props.isCompleted ? (
        <>
          <div
            style={{
              height: "90%",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "10%",
            }}
          >
            <h1
              style={{
                textAlign: "left",
                color: "var(--mydarkerblue)",
                marginTop: "0",
                marginBottom: "0",
                marginLeft: "5%",
              }}
            >
              {props.title}
            </h1>
            <p
              style={{
                textAlign: "left",
                color: "var(--mydarkblue)",
                marginTop: "0",
                marginBottom: "0",
                marginLeft: "6%",
              }}
            >
              {props.description}
            </p>
          </div>
          <CheckCircleIcon
            sx={{
              position: "absolute",
              top: "5%",
              right: "2%",
              color: "green",
              fontSize: 35,
            }}
          />
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
