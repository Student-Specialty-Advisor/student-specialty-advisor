import React from "react";
import { Button, Stack, Box } from "@mui/material";
import { completeAchievement } from "../../../services/achievements";
function Forum() {
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
          <Box bgcolor="white">
            <Button
              href="/forum/thread-name"
              fullWidth
              size="large"
              variant="outlined"
            >
              <div style={{ color: "var(--mydarkerblue)" }}>Thread:&nbsp;</div>
              Thread name
            </Button>
          </Box>
        </Stack>
      </div>
    </>
  );
}

export default Forum;
