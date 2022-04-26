import React from "react";
import { Stack } from "@mui/material";
import { completeAchievement } from "../../../services/achievements";
import ThreadLink from "./ThreadLink";
function Forum() {
  React.useEffect(() => {
    document.title = "Community Forum - Student Specialty Advisor";
  }, []);
  React.useEffect(() => {
    completeAchievement("forumCompletion", "Come back soon!");
  }, []);

  return (
    <>
      <div className="forum-container">
        <h1>Community Forum</h1>
        <h6>
          Share your thoughts & describe your experience with the specialties
        </h6>
        <Stack margin="auto" width="90%" spacing={2}>
          {/*Map me here*/}
          <ThreadLink
            name="thread name"
            date="Some date"
            commentsNumber="Some number"
          />
        </Stack>
      </div>
    </>
  );
}

export default Forum;
