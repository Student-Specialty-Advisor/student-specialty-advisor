const mongoose = require("mongoose");

const Video = mongoose.model("Video", {
  title: { type: String, unique: true },
  link: { type: String, unique: true },
  specialty: String,
});

module.exports = Video;
