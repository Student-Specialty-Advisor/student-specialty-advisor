const fs = require("fs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/student-specialty-advisor", () => {
  console.log("Connected to database");
});

//Export
module.exports = mongoose;
