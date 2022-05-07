const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
  date: { type: Date, default: Date.now },
  message: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isDeleted: { type: Boolean, default: false },
});

module.exports = Comment;
