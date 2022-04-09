const mongoose = require("mongoose");

const Advisor = mongoose.model("Advisor", {
  fullName: String,
  email: { type: String, unique: true },
  profession: String,
  specialty: String,
  linkedinUrl: { type: String, unique: true },
  imageUrl: { type: String, unique: true },
  quote: String,
});

module.exports = Advisor;
