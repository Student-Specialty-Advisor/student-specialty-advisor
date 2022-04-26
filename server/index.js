const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");
require("./db/User");
/*const path = require("path");*/
const accountSystemController = require("./controllers/accountSystemController.js");
const statisticsController = require("./controllers/statisticsController.js");
const quizController = require("./controllers/quizController.js");
const meetingController = require("./controllers/meetingController.js");
const videoController = require("./controllers/videoController.js");
const achievementsController = require("./controllers/achievementsController.js");
const forumController = require("./controllers/forumController");
const authJWT = require("./middlewares/authJWT");

const app = express();
const PORT = process.env.PORT || 8000;

/*const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath)); LEAVE THIS COMMENTED*/

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

//#region Account System

// Use this endpoint to create a new user account
app.post("/ssa-api/sign-up", accountSystemController.SignUp);

// Use this endpoint to login to an existing user account
app.post("/ssa-api/log-in", accountSystemController.LogIn);

// Use this endpoint to update an existing user account's information
// REQUIRES: Authentication
app.put(
  "/ssa-api/edit-profile/",
  [authJWT.verifyToken],
  accountSystemController.EditAccount
);

// Use this endpoint to verify a user account
app.put("/ssa-api/verify/:id", accountSystemController.HandleVerification);
//#endregion

//#region Program Compatibility Quiz

// Use this endpoint to get the current list of quiz questions
// REQUIRES: Authentication
app.get(
  "/ssa-api/quiz-questions",
  [authJWT.verifyToken],
  quizController.getQuestionList
);

// Use this endpoint to process the answers and expect a quiz result
// REQUIRES: Authentication
app.post(
  "/ssa-api/quiz-questions",
  [authJWT.verifyToken],
  quizController.sendQuestionAnswer
);
//#endregion

//#region Statistics

// Use this endpoint to get statistics about the program compatibility quiz
// REQUIRES: Authentication, Admin rights
app.get(
  "/ssa-api/statistics",
  [authJWT.verifyToken, authJWT.isAdmin],
  statisticsController.GetStats
);
//#endregion

//#region Advisors:

// Use this endpoint to get the list of the current advisors
// REQUIRES: Authentication
app.get(
  "/ssa-api/meeting/advisors",
  [authJWT.verifyToken],
  meetingController.getListOfAdvisors
);

// Use this endpoint to create a new advisor
// REQUIRES: Authentication, Admin rights
app.post(
  "/ssa-api/meeting/advisors",
  [authJWT.verifyToken, authJWT.isAdmin],
  meetingController.postAdvisor
);

// Use this endpoint to delete an advisor using the MongoDB ObjectID
// REQUIRES: Authentication, Admin rights
app.delete(
  "/ssa-api/meeting/advisors/:id",
  [authJWT.verifyToken, authJWT.isAdmin],
  meetingController.deleteAdvisor
);

// Use this endpoint to update an advisor's information using the MongoDB ObjectID
// REQUIRES: Authentication, Admin rights
app.put(
  "/ssa-api/meeting/advisors/:id",
  [authJWT.verifyToken, authJWT.isAdmin],
  meetingController.updateAdvisor
);
//#endregion

//#region Meetings Schedule

// Use this endpoint to get the current schedule of meetings
// REQUIRES: Authentication
app.get(
  "/ssa-api/meeting/schedule",
  [authJWT.verifyToken],
  meetingController.getListOfMeetings
);

// Use this endpoint to add a new meeting to the schedule
// REQUIRES: Authentication, Admin rights
app.post(
  "/ssa-api/meeting/schedule",
  [authJWT.verifyToken, authJWT.isAdmin],
  meetingController.postMeeting
);

// Use this endpoint to remove an existing meeting from the schedule
// REQUIRES: Authentication, Admin rights
app.delete(
  "/ssa-api/meeting/schedule/:id",
  [authJWT.verifyToken, authJWT.isAdmin],
  meetingController.deleteMeeting
);
//#endregion

//#region Meetings Reservation

// Use this endpoint to request & reserve a meeting for the current week
// REQUIRES: Authentication
app.put(
  "/ssa-api/meeting/request",
  [authJWT.verifyToken],
  meetingController.requestMeeting
);

// Use this endpoint to remove all reservations and reset the availability of meetings to true
// REQUIRES: Authentication, Admin rights
// TIP: This task is supposed to become scheduled to execute every Sunday at midnight
app.get(
  "/ssa-api/meeting/request/unlock",
  [authJWT.verifyToken, authJWT.isAdmin],
  meetingController.unlockRequestedMeetings
);
//#endregion

//#region Videos

// Use this endpoint to store a new video
// REQUIRES: Authentication, Admin rights
app.post(
  "/ssa-api/videos",
  [authJWT.verifyToken, authJWT.isAdmin],
  videoController.postVideo
);

// Use this endpoint to delete a video using its MongoDB ObjectID
// REQUIRES: Authentication, Admin rights
app.delete(
  "/ssa-api/videos/:id",
  [authJWT.verifyToken, authJWT.isAdmin],
  videoController.deleteVideo
);

// Use this endpoint to get the list of all videos
// REQUIRES: Authentication
app.get(
  "/ssa-api/videos",
  [authJWT.verifyToken],
  videoController.getListOfAllVideos
);

// Use this endpoint to get the list of all videos of a certain specialty
// REQUIRES: Authentication
app.get(
  "/ssa-api/videos/:specialty",
  [authJWT.verifyToken],
  videoController.getListOfVideosBySpecialty
);
//#endregion

//#region Achievements

// Use this endpoint to get the achievements of the user using their MongoDB ObjectID
// REQUIRES Authentication
app.get(
  "/ssa-api/achievements/:userID",
  [authJWT.verifyToken],
  achievementsController.getAchievements
);

// Use this endpoint to update a certain field in a user's achievement using their MongoDB ObjectID
// REQUIRES Authentication
app.put(
  "/ssa-api/achievements/:userID",
  [authJWT.verifyToken],
  achievementsController.setAchievement
);
//#endregion

//#region Forum
app.get(
  "/ssa-api/forum/comments/:name",
  [authJWT.verifyToken],
  forumController.getComments
);
app.get(
  "/ssa-api/forum/threads",
  [authJWT.verifyToken],
  forumController.getThreads
);
app.put(
  "/ssa-api/forum/threads/:name",
  [authJWT.verifyToken],
  forumController.saveComments
);
app.post(
  "/ssa-api/forum/threads",
  [authJWT.verifyToken],
  forumController.createThread
);
//#endregion

app.listen(PORT, () => {
  console.log(`Started listening to requests on port ${PORT}`);
});
