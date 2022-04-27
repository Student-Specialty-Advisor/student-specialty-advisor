import { Divider, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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
            {props.userName}
          </Typography>
          <Typography fontSize="0.9rem" marginTop="7px" color="var(--myblue)">
            University Year: <span style={{ color: "blue" }}>{props.year}</span>
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
          <Typography height="90%" whiteSpace="pre">
            {props.content}
          </Typography>
          <Divider sx={{ bgcolor: "var(--myblue)" }} />
          <Typography fontSize="0.7rem">
            Posted on the: {shortenDate(props.date)}
          </Typography>
        </div>
      </div>
      <div className="comment-container-options">
        {props.isOwner || props.isAdmin ? (
          <IconButton sx={{ color: "darkred" }}>
            <DeleteIcon />
          </IconButton>
        ) : null}
      </div>
    </Paper>
  );
}

export default Comment;
