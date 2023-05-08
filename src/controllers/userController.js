const db = require("../models");
const User = db.users.getUserModel();
const mongoose = require("mongoose");

exports.updateUser = async (req, res) => {
  // Validate request
  // Should look like:
  // updateUser([updateField], [updateValue], userID);
  if (!mongoose.isValidObjectId(req.body.userID)) {
    console.log("Invalid User Mongoose ID");
    res.status(400).send({ message: "Missing body contents!" });
    return;
  }

  console.log(req.body);

  const userID = req.body.userID;
  let updateData = req.body;
  delete updateData.userID;
  const updateField = Object.keys(updateData)[0];
  const updateValue = Object.values(updateData)[0];

  try {
    let foundUser = await User.findOne({ _id: userID });
    if(!foundUser) {
      console.log("Character Not Found!");
    } else {
      if (foundUser[updateField] !== updateValue) {
        foundUser[updateField] = updateValue;
        await foundUser.save();
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the user",
    });
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const foundUsers = await User.find({});
    res.send(foundUsers);
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  // Validate request
  if (!mongoose.isValidObjectId(req.body.userID)) {
    console.log("Invalid User Mongoose ID");
    res.status(400).send({ message: "Missing body contents!" });
    return;
  }

  try {
    const foundUser = await User.findById(req.body.userID);
    res.send(foundUser);
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (req, res) => {
  const newUser = req.body.newUser;
  // Validate request
  if (!newUser.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = new User(newUser);
  // Save Character in the database
  try {
    await user.save();
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User",
    });
  }
};
