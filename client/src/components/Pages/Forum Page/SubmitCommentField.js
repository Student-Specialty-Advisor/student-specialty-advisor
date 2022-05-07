import {
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import { StyledTextField } from "../../Basic Elements/StyledBasicElements";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import alertify from "alertifyjs";
import AuthService from "../../../services/AuthService";
import fetchService from "../../../services/fetchService";
import { stringAvatar } from "../../utils";
import { completeAchievement } from "../../../services/achievements";

function SubmitCommentField(props) {
  const [message, setMessage] = React.useState("");
  const [onCooldown, setOnCooldown] = React.useState(false);
  const [cooldownProgress, setCooldownProgress] = React.useState(100);
  const CD = 30;

  const currentUser = AuthService.getCurrentUser();

  const cooldownInterval = () => {
    var interval = setInterval(() => {
      setCooldownProgress((cooldownProgress) => {
        if (cooldownProgress > 0) {
          return Math.floor(cooldownProgress - 100 / CD);
        } else {
          setOnCooldown(false);
          clearInterval(interval);
          return 100;
        }
      });
    }, 1000);
    return interval;
  };

  const submit = () => {
    if (message.trim().length !== 0) {
      fetchService
        .doPUT("forum/threads/" + props.threadName, {
          message: message,
          user: currentUser.id,
        })
        .then((response) => {
          if (response.success) {
            props.fetchComments();
            setOnCooldown(true);
            setMessage("");
            cooldownInterval();
            props.didPost.current.didPost = true;
            completeAchievement("forumCompletion", "Community Forum");
          } else {
            throw response;
          }
        })
        .catch((error) => {
          alertify.error(
            "There was an error while submitting your comment. Try again later!"
          );
        });
    } else {
      alertify.warning(
        "Write something first before trying to submit your comment!"
      );
    }
  };

  return (
    <Paper className="comment-submit-container" elevation={3}>
      {!props.isMobile && (
        <>
          <Avatar
            className="comment-submit-user-avatar"
            {...stringAvatar(props.userName)}
          />
          <Divider
            flexItem
            orientation="vertical"
            sx={{
              marginRight: "21px",
              marginLeft: "21px",
              marginTop: "7px",
              marginBottom: "7px",
              bgcolor: "var(--myblue)",
            }}
          />
        </>
      )}
      <div className="comment-submit-text-field">
        <StyledTextField
          id="submit-comment-text-field"
          fullWidth
          placeholder="Write your reply..."
          variant="outlined"
          multiline
          rows={7}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          InputProps={{ sx: { bgcolor: "rgb(245, 245, 245) !important" } }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "14px",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "36px",
              width: "36px",
            }}
          >
            {onCooldown && (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "-1px",
                  left: "-3px",
                  color: "rgba(139,0,0,0.5)",
                }}
                size={36}
                variant="determinate"
                value={cooldownProgress}
              />
            )}
            <IconButton
              onClick={submit}
              size="small"
              sx={{
                position: "absolute",
                color: onCooldown
                  ? "rgba(139,0,0,0.5) !important"
                  : "var(--mydarkerblue)",
              }}
              disabled={onCooldown}
            >
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <span style={{ marginRight: "21px" }}></span>
    </Paper>
  );
}

export default SubmitCommentField;
