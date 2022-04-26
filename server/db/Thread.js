const mongoose = require("mongoose");

const Thread = mongoose.model("Thread", {
  name: { type: String, unique: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  date: { type: Date, default: Date.now },
});

module.exports = Thread;
