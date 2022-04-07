const mongoose = require("mongoose");
const { Schema } = mongoose;
const AdvisorSchema = new Schema({
  id: { type: Number, unique: true },
  fullName: String,
  email: { type: String, unique: true },
  profession: String,
  specialty: String,
  linkedinUrl: { type: String, unique: true },
  imageUrl: { type: String, unique: true },
  quote: String,
});
const MeetingSchema = new Schema({
  day: String,
  from: String,
  to: String,
  advisor: AdvisorSchema,
  row: Number,
  col: Number,
});
MeetingSchema.index({ day: 1, from: 1, to: 1, advisor: 1 }, { unique: true });
MeetingSchema.index({ row: 1, col: 1 }, { unique: true });
const Meeting = mongoose.model("Meeting", MeetingSchema);
module.exports = Meeting;
