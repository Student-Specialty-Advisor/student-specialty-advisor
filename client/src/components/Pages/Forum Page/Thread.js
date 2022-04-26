import React from "react";
import { useParams } from "react-router-dom";

function Thread() {
  let { thread } = useParams();
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
