const mongoose = require("mongoose");

const Video = mongoose.model("Video", {
  link: { type: String, unique: true },
  specialty: String,
});

module.exports = Video;
