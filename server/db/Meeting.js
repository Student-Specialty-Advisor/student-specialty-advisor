const mongoose = require("mongoose");
const { Schema } = mongoose;

const MeetingSchema = new Schema({
  day: String,
  from: String,
  to: String,
  advisorName: String,
  email: String,
});
MeetingSchema.index({ day: 1, from: 1, to: 1, email: 1 }, { unique: true });
const Meeting = mongoose.model("Meeting", MeetingSchema);
module.exports = Meeting;
