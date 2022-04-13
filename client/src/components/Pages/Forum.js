import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { completeAchievement } from "../../services/achievements";
function Forum() {
  React.useEffect(() => {
    document.title = "Community Forum - Student Specialty Advisor";
  }, []);
  React.useEffect(() => {
    completeAchievement("forumCompletion", "Come back soon!");
  }, []);

  return (
    <>
      <div className="forum-constuction-container">
        <img alt=""></img>
        <h1>The Community Forum is</h1>
        <h1 className="coming-soon">COMING SOON</h1>
        <h1>Cannot Wait To See You There !</h1>
        <div
          style={{
            display: "flex",
            gap: "5%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            className="forum-loading"
            color="inherit"
            size={100}
          />
        </div>
      </div>
    </>
  );
}

export default Forum;
