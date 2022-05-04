import React from "react";
import { Box, Button, Typography } from "@mui/material";

function ThreadLink(props) {
  return (
    <Box bgcolor="white">
      <Button
        sx={{ padding: "0" }}
        href={
          props.overrideHref
            ? props.overrideHref
            : `/forum/threads/${props.name.replace(/ /g, "-")}`
        }
        fullWidth
        size="large"
        variant="outlined"
      >
        <div className="thread-info-container">
          <Typography
            color="var(--mydarkerblue)"
            fontSize="inherit"
            fontWeight="inherit"
          >
            Thread: <span style={{ color: "#1976d2" }}>{props.name}</span>
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              marginTop="7px"
              color="var(--mydarkerblue)"
              fontSize="0.7rem"
              fontWeight="inherit"
            >
              Number of comments so far: {props.commentsNumber}
            </Typography>
            <Typography
              marginTop="7px"
              color="var(--mydarkerblue)"
              fontSize="0.7rem"
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
