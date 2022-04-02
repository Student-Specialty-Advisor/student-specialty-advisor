const mongoose = require("mongoose");

const Advisor = mongoose.model("Advisor", {
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  profession: String,
  linkedinUrl: { type: String, unique: true },
  imageUrl: { type: String, unique: true },
});

module.exports = Advisor;
