import { Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import fetchService from "../../../services/fetchService";
import Comment from "./Comment";
import alertify from "alertifyjs";
import SubmitCommentField from "./SubmitCommentField";
import AuthService from "../../../services/AuthService";
import Footer from "../Footer";

function Thread(props) {
  let { thread } = useParams();
  const [comments, setComments] = React.useState([]);
  const currentUser = AuthService.getCurrentUser();
  const isAdmin = AuthService.isAdmin();
  const didPost = React.useRef({ didPost: false });

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
        comment_id={c._id}
        isDeleted={c.isDeleted}
        userName={c.user.firstName + " " + c.user.lastName}
        userRole={c.user.role}
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

  React.useEffect(() => {
    if (comments.length !== 0) {
      if (didPost.current.didPost === false) {
        didPost.current.didPost = true;
      } else {
        document
          .getElementById("submit-comment-text-field")
          .scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [comments]);

  return (
    <>
      <div className="forum-container">
        <h1>{thread.replace(/-/g, " ")}</h1>
        <Stack className="forum-stack" spacing={1}>
          {commentsList}
          <SubmitCommentField
            /*picture={c.user.picture} Not yet implemented in the backend*/
            threadName={thread.replace(/-/g, " ")}
            fetchComments={fetchComments}
          />
        </Stack>
      </div>
      <Footer id="no-margin" />
    </>
  );
}

export default Thread;
