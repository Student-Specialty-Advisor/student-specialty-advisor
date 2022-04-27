const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./Comment");

const ThreadSchema = new Schema({
  name: { type: String, unique: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  date: { type: Date, default: Date.now },
});

ThreadSchema.post("findOneAndDelete", function (doc) {
  Comment.deleteMany({ _id: { $in: doc.comments } }).exec();
});

const Thread = mongoose.model("Thread", ThreadSchema);

module.exports = Thread;
