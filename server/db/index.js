const fs = require("fs");
const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log(error));
