const mongoose = require("mongoose");
const User = mongoose.model("User", {
  firstName: String,
  lastName: String,
  universityYear: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
});

module.exports = User;
