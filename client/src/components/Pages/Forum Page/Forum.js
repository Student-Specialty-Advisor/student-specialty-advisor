import React from "react";
import { Stack } from "@mui/material";
import { completeAchievement } from "../../../services/achievements";
import fetchService from "../../../services/fetchService";
import ThreadLink from "./ThreadLink";
function Forum() {
  React.useEffect(() => {
    document.title = "Community Forum - Student Specialty Advisor";
  }, []);
  React.useEffect(() => {
    completeAchievement("forumCompletion", "Come back soon!");
  }, []);
  const [threads, setThreads] = React.useState([]);

  React.useEffect(() => {
    fetchService
      .doGET("forum/threads")
      .then((response) => {
        setThreads(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="forum-container">
        <h1>Community Forum</h1>
        <h6>
          Express your thoughts & share your experience with the specialties
        </h6>
        <Stack margin="auto" width="90%" spacing={2}>
          {threads.map((thread) => {
            return (
              <ThreadLink
                name={thread.name}
                date={thread.date}
                commentsNumber={thread.comments.length}
              />
            );
          })}
        </Stack>
      </div>
    </>
  );
}

export default Forum;
