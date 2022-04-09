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

// Account System
app.post("/ssa-api/sign-up", accountSystemController.SignUp);
app.post("/ssa-api/log-in", accountSystemController.LogIn);
app.put(
  "/ssa-api/edit-profile/",
  [authJWT.verifyToken],
  accountSystemController.EditAccount
);

// Program Compatibility Quiz
app.get(
  "/ssa-api/quiz-questions",
  [authJWT.verifyToken],
  quizController.getQuestionList
);

app.post(
  "/ssa-api/quiz-questions",
  [authJWT.verifyToken],
  quizController.sendQuestionAnswer
);

// Statistics
app.get(
  "/ssa-api/statistics",
  [authJWT.verifyToken, authJWT.isAdmin],
  statisticsController.GetStats
);

//Meeting:

//advisors
app.get(
  "/ssa-api/meeting/advisors",
  [authJWT.verifyToken],
  meetingController.getListOfAdvisors
);
app.post(
  "/ssa-api/meeting/advisors",
  [authJWT.verifyToken, authJWT.isAdmin],
  meetingController.postAdvisor
);
//meetings schedule
app.get(
  "/ssa-api/meeting/schedule",
  [authJWT.verifyToken],
  meetingController.getListOfMeetings
);
app.post(
  "/ssa-api/meeting/schedule",
  [authJWT.verifyToken, authJWT.isAdmin],
  meetingController.postMeeting
);
//meetings reservation/requests
app.put(
  "/ssa-api/meeting/request",
  [authJWT.verifyToken],
  meetingController.requestMeeting
);
app.get(
  "/ssa-api/meeting/request/unlock",
  [authJWT.verifyToken, authJWT.isAdmin],
  meetingController.unlockRequestedMeetings
);

app.listen(PORT, () => {
  console.log(`Started listening to requests on port ${PORT}`);
});
