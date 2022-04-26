import React from "react";
import { Stack } from "@mui/material";
import { completeAchievement } from "../../../services/achievements";
import fetchService from "../../../services/fetchService";
import ThreadLink from "./ThreadLink";
import alertify from "alertifyjs";
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
        if (!response.error) setThreads(response);
        else throw response;
      })
      .catch((error) => {
        alertify.error("an error was occured while loading the forum threads");
      });
  }, []);
  const convertDate = (date) => {
    return date.substr(0, 10);
  };
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
                key={thread._id}
                name={thread.name}
                date={convertDate(thread.date)}
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
