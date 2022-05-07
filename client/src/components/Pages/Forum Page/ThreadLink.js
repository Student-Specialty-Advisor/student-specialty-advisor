import React from "react";
import { Box, Button, Typography } from "@mui/material";

function ThreadLink(props) {
  const href = props.overrideHref
    ? props.overrideHref
    : `/forum/threads/${props.name.replace(/ /g, "-")}`;

  return (
    <Box bgcolor="white">
      <Button
        sx={{ padding: "0" }}
        fullWidth
        size="large"
        variant="outlined"
        onClick={() => {
          props.history.push(href);
        }}
      >
        <div className="thread-info-container">
          <Typography
            color="var(--mydarkerblue)"
            fontSize="inherit"
            fontWeight="inherit"
          >
            Thread: <span style={{ color: "#1976d2" }}>{props.name}</span>
          </Typography>
          <div className="thread-stats">
            <Typography
              fontSize="inherit"
              marginTop="7px"
              color="var(--mydarkerblue)"
              fontWeight="inherit"
            >
              Number of comments: {props.commentsNumber}
            </Typography>
            <Typography
              fontSize="inherit"
              marginTop="7px"
              color="var(--mydarkerblue)"
              fontWeight="inherit"
            >
              Discussion started on: {props.date}
            </Typography>
          </div>
        </div>
      </Button>
    </Box>
  );
}

export default ThreadLink;
