import React from "react";
import { useParams } from "react-router-dom";
import fetchService from "../../../services/fetchService";
import Comment from "./Comment";

function Thread() {
  let { thread } = useParams();
  const [comments, setComments] = React.useState([]);

  const fetchComments = () => {
    fetchService
      .doGET("forum/comments/" + thread.replace(/-/g, " "))
      .then((response) => {
        alert(JSON.stringify(response));
        console.log(response); // response is a json and will have error+errorObject or success+comments
        // Do here anything related with the response, check if response was successful or not
        // If response was successful, setComments to the response
        // If response was an error, throw the response (code: throw response;) so that .catch handles it
      })
      .catch((error) => {
        // Do here anything related with telling the user there was an error loading comments
        console.log(error);
      });
  };

  const commentsList = comments.map((c) => {
    return (
      <Comment key={c._id} user={c.user} date={c.date} content={c.message} />
    );
  });

  React.useEffect(fetchComments, [thread]);

  return (
    <>
      <div className="forum-container">
        <h1>{thread.replace(/-/g, " ")}</h1>
      </div>
      {commentsList}
    </>
  );
}

export default Thread;
