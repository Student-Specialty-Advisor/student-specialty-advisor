import { Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import fetchService from "../../../services/fetchService";
import Comment from "./Comment";
import alertify from "alertifyjs";
import SubmitCommentField from "./SubmitCommentField";
import AuthService from "../../../services/AuthService";

function Thread(props) {
  let { thread } = useParams();
  const [comments, setComments] = React.useState([]);
  const currentUser = AuthService.getCurrentUser();
  const isAdmin = AuthService.isAdmin();

  React.useEffect(() => {
    document.title =
      "Community Forum - " +
      thread.replace(/-/g, " ") +
      " - Student Specialty Advisor";
  }, [thread]);

  const fetchComments = () => {
    fetchService
      .doGET("forum/comments/" + thread.replace(/-/g, " "))
      .then((response) => {
        if (response.success) {
          setComments(response.comments);
        } else {
          throw response;
        }
      })
      .catch((error) => {
        props.history.push("/forum");
        alertify.error(
          "The thread you tried to access does not exist or might have been changed!"
        );
      });
  };

  const commentsList = comments.map((c) => {
    return (
      <Comment
        key={c._id}
        userName={c.user.firstName + " " + c.user.lastName}
        isOwner={c.user._id === currentUser.id}
        isAdmin={isAdmin}
        date={c.date}
        content={c.message}
        year={c.user.universityYear}
        /*picture={c.user.picture} Not yet implemented in the backend*/
      />
    );
  });

  React.useEffect(fetchComments, [thread, props.history]);

  return (
    <>
      <div className="forum-container">
        <h1>{thread.replace(/-/g, " ")}</h1>
      </div>
      <Stack className="forum-stack" spacing={1}>
        {commentsList}
        <SubmitCommentField />
      </Stack>
    </>
  );
}

export default Thread;
