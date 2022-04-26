import { Divider, Paper, Typography } from "@mui/material";
import React from "react";

function Comment(props) {
  const shortenDate = (date) => {
    return date.substr(0, 19).replace(/T/g, " ");
  };

  return (
    <Paper className="comment-container" elevation={3}>
      <div
        style={{ display: "flex", flexDirection: "row", padding: "7px 21px" }}
      >
        <div className="comment-user-section">
          <img src={props.picture} alt=""></img>
          <Typography marginTop="7px" color="var(--mydarkerblue)">
            {props.user}
          </Typography>
        </div>
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            marginRight: "21px",
            marginLeft: "21px",
            bgcolor: "var(--myblue)",
          }}
        />
        <div className="comment-content-section">
          <Typography height="90%">{props.content}</Typography>
          <Divider sx={{ bgcolor: "var(--myblue)" }} />
          <Typography fontSize="0.7rem">
            Posted on the: {shortenDate(props.date)}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default Comment;
