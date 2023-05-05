const mongoose = require("mongoose");

const userSchema = {
  fname: String,
  lname: String,
  email: String,
  userID: String,
  userCharacters: [{ type : mongoose.ObjectId, ref: 'Character' }],
};

exports.getUserModel = () => {
  const User = mongoose.model("User", userSchema);
  return User;
};
