const mongoose = require("mongoose");

const Achievements = mongoose.model("Achievements", {
  quizCompletion: { type: Boolean, default: false },
  infoSectionCompletion: { type: Boolean, default: false },
  videosCompletion: { type: Boolean, default: false },
  meetingsSectionCompletion: { type: Boolean, default: false },
  meetingsRequestCompletion: { type: Boolean, default: false },
  forumCompletion: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User", unique: true },
});

module.exports = Achievements;
