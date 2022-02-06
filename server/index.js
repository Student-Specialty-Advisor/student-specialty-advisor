const express = require("express");
const db = require("./db");
/*const path = require("path");*/
const app = express();
const PORT = process.env.PORT || 8000;

/*const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath)); LEAVE THIS COMMENTED*/

/* use app.put / app.get ... here without a router class. It's necessary for heroku deployment */

app.listen(PORT, () => {
  console.log(`Started listening to requests on port ${PORT}`);
});