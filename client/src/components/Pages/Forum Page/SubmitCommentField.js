import { CircularProgress, Divider, IconButton, Paper } from "@mui/material";
import { StyledTextField } from "../../Basic Elements/StyledBasicElements";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

function SubmitCommentField(props) {
  const [message, setMessage] = React.useState("");
  const [onCooldown, setOnCooldown] = React.useState(false);
  const [cooldownProgress, setCooldownProgress] = React.useState(100);

  const CD = 10;

  const cooldownInterval = () => {
    var interval = setInterval(() => {
      setCooldownProgress((cooldownProgress) => {
        if (cooldownProgress > 0) {
          return cooldownProgress - 100 / CD;
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
    setOnCooldown(true);
    cooldownInterval();
  };

  return (
    <Paper className="comment-submit-container" elevation={3}>
      <img src={props.picture} alt=""></img>
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
      <div className="comment-submit-text-field">
        <StyledTextField
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
                  color: "darkred",
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
