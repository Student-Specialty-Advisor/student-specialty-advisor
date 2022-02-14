const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");
require("./db/User");
/*const path = require("path");*/
const controller = require("./controllers/accountSystemController.js");
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

app.post("/as-api/sign-up", controller.SignUp);
app.post("/as-api/log-in", controller.LogIn);
/*app.get("/as-api/", );
app.delete("/as-api/", );*/
app.put("/as-api/edit-profile/", [authJWT.verifyToken], controller.EditAccount);

app.listen(PORT, () => {
  console.log(`Started listening to requests on port ${PORT}`);
});
