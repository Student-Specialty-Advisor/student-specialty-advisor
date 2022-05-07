import { Avatar, Divider, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import fetchService from "../../../services/fetchService";
import useIsOverflow from "../../Custom Hooks/useIsOverflow";
import alertify from "alertifyjs";
import { stringAvatar } from "../../utils";

function Comment(props) {
  const [content, setContent] = React.useState(props.content);
  const [isDeleted, setIsDeleted] = React.useState(props.isDeleted);
  const [readMore, setReadMore] = React.useState(false);
  const contentRef = React.useRef();
  const isOverflow = useIsOverflow(contentRef);
  const STUDENT_YEARS = ["Freshman", "Sophomore", "Junior", "Senior", "Final"];

  const shortenDate = (date) => {
    return date.substr(0, 19).replace(/T/g, " ");
  };

  const deleteComment = () => {
    if (isDeleted === false) {
      fetchService
        .doPUT("forum/comments/" + props.comment_id)
        .then((response) => {
          if (response.success) {
            setContent(response.deletedComment.message);
            setIsDeleted(response.deletedComment.isDeleted);
            props.fetchComments();
            alertify.success("This comment was deleted successfully!");
          } else {
            throw response;
          }
        })
        .catch((error) => {
          alertify.error(
            "An error occured when trying to delete this comment. Please try again later!"
          );
          console.log(error);
        });
    }
  };

  const userSectionOnTheSide = (
    <>
      <div className="comment-user-section">
        <Avatar
          className="comment-user-avatar"
          {...stringAvatar(props.userName)}
        />
        <Typography marginTop="7px" color="var(--mydarkerblue)">
          {props.userName}
        </Typography>
        {props.userRole === "Admin" && (
          <Typography
            fontSize="0.85rem"
            bgcolor="darkred"
            color="white"
            padding="2px 12px"
            marginBottom="14px"
            sx={{ animation: "liveDotGlow 2s infinite" }}
          >
            Admin
          </Typography>
        )}
        <Typography fontSize="0.9rem" marginTop="7px" color="blue">
          {props.year}
          {STUDENT_YEARS.includes(props.year) && " Student"}
        </Typography>
      </div>
    </>
  );

  const userSectionOnTop = (
    <>
      <div className="comment-user-section">
        <Avatar
          className="comment-user-avatar"
          {...stringAvatar(props.userName)}
        />
        <div>
          <Typography marginTop="7px" color="var(--mydarkerblue)">
            {props.userName}
          </Typography>
          <Typography fontSize="0.9rem" marginTop="7px" color="blue">
            {props.year}
            {STUDENT_YEARS.includes(props.year) && " Student"}
          </Typography>
        </div>
        {props.userRole === "Admin" && (
          <Typography
            fontSize="0.85rem"
            bgcolor="darkred"
            color="white"
            padding="2px 12px"
            sx={{ animation: "liveDotGlow 2s infinite" }}
          >
            Admin
          </Typography>
        )}
      </div>
    </>
  );

  return (
    <Paper className="comment-container" elevation={3}>
      <div
        style={{
          display: "flex",
          flexDirection: props.isUnder600px ? "column" : "row",
          padding: "7px 21px",
        }}
      >
        {props.isUnder600px ? userSectionOnTop : userSectionOnTheSide}
        <Divider
          flexItem
          orientation={props.isUnder600px ? "horizontal" : "vertical"}
          sx={{
            marginRight: props.isUnder600px ? "-21px" : "21px",
            marginLeft: props.isUnder600px ? "-21px" : "21px",
            marginTop: props.isUnder600px ? "14px" : "0px",
            marginBottom: props.isUnder600px ? "14px" : "0px",
            bgcolor: "var(--myblue)",
          }}
        />
        <div className="comment-content-section">
          <Typography
            ref={contentRef}
            color={isDeleted && "darkred"}
            fontStyle={isDeleted && "italic"}
            height={readMore ? null : "215px"}
            minHeight={readMore && "215px"}
            overflow={!readMore && "hidden"}
            whiteSpace="pre-line"
            width="97%"
            sx={{ wordBreak: "break-all" }}
            paddingBottom="7px"
            className="comment-content-typography"
          >
            {content}
          </Typography>
          {isOverflow &&
            (readMore ? (
              <Typography
                className="readmore-button"
                onClick={() => {
                  setReadMore(false);
                }}
              >
                Show less
              </Typography>
            ) : (
              <Typography
                className="readmore-button"
                onClick={() => {
                  setReadMore(true);
                }}
              >
                Read more
              </Typography>
            ))}
          <Divider
            sx={{
              bgcolor: "var(--myblue)",
              marginLeft: props.isUnder600px ? "-21px" : "0px",
              marginRight: props.isUnder600px ? "-21px" : "0px",
            }}
          />
          <Typography fontSize="0.7rem">
            Posted on the: {shortenDate(props.date)}
          </Typography>
        </div>
      </div>
      <div className="comment-container-options">
        {isDeleted === false ? (
          props.isOwner || props.isAdmin ? (
            <IconButton onClick={deleteComment} sx={{ color: "darkred" }}>
              <DeleteIcon />
            </IconButton>
          ) : null
        ) : null}
      </div>
    </Paper>
  );
}

export default Comment;
