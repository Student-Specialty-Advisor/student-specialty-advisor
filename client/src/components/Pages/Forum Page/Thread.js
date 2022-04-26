import React from "react";
import { useParams } from "react-router-dom";
import fetchService from "../../../services/fetchService";

function Thread() {
  let { thread } = useParams();
  const [commentsList, setCommentsList] = React.useState([]);

  React.useEffect(async () => {
    const comments = await fetchService.doGET(
      "/ssa-api/forum/comments/" + thread
    );
    setCommentsList(comments);
  }, [thread]);
  return (
    <>
      <div>Thread: {thread}</div>
      <div>Thread: {thread}</div>
      <div>Thread: {thread}</div>
      <div>Thread: {thread}</div>
      <div>Thread: {thread}</div>
    </>
  );
}

export default Thread;
