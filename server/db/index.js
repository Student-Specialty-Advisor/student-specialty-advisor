const fs = require("fs");
const mongoose = require("mongoose");

module.exports = mongoose
  .connect("mongodb://localhost:27017/student-specialty-advisor")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => console.log(error));
