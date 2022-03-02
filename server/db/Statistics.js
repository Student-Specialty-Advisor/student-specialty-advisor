const mongoose = require("mongoose");

const Statistics = mongoose.model("Statistics", {
  date: { type: Date, default: Date.now },
  result: String,
});

module.exports = Statistics;
