import React from "react";
import { Button, Stack, Box, Typography } from "@mui/material";
import { completeAchievement } from "../../../services/achievements";
function Forum() {
  const ThreadLink = (props) => {
    return (
      <Box bgcolor="white">
        <Button
          sx={{ padding: "0" }}
          href="/forum/thread-name"
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
  };

  React.useEffect(() => {
    document.title = "Community Forum - Student Specialty Advisor";
  }, []);
  React.useEffect(() => {
    completeAchievement("forumCompletion", "Come back soon!");
  }, []);

  return (
    <>
      <div className="forum-container">
        <h1>Community Forum</h1>
        <h6>
          Share your thoughts & describe your experience with the specialties
        </h6>
        <Stack margin="auto" width="90%" spacing={2}>
          {/*Map me here*/}
          <ThreadLink
            name="Thread name"
            date="Some date"
            commentsNumber="Some number"
          />
        </Stack>
      </div>
    </>
  );
}

export default Forum;
