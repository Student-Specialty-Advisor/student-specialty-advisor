const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");
require("./db/User");
/*const path = require("path");*/
const accountSystemController = require("./controllers/accountSystemController.js");
const statisticsController = require("./controllers/statisticsController.js");
const authJWT = require("./middlewares/authJWT");

const app = express();
const PORT = process.env.PORT || 8000;

/*const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath)); LEAVE THIS COMMENTED*/

/* use app.put / app.get ... here without a router class. It's necessary for heroku deployment */

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

// Statistics
app.post(
  "/ssa-api/statistics",
  [authJWT.verifyToken, authJWT.isAdmin],
  statisticsController.PostStat
);
app.get(
  "/ssa-api/statistics",
  [authJWT.verifyToken, authJWT.isAdmin],
  statisticsController.GetStats
);

app.listen(PORT, () => {
  console.log(`Started listening to requests on port ${PORT}`);
});
