const mongoose = require("mongoose");
const { Schema } = mongoose;

const MeetingSchema = new Schema({
  day: String,
  from: String,
  advisor: { type: Schema.Types.ObjectId, ref: "Advisor" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  isAvailable: Boolean,
  row: Number,
  col: Number,
});
MeetingSchema.index({ day: 1, from: 1, advisor: 1 }, { unique: true });
MeetingSchema.index({ row: 1, col: 1 }, { unique: true });
const Meeting = mongoose.model("Meeting", MeetingSchema);
module.exports = Meeting;
