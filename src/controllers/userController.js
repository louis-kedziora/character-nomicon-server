const db = require("../models");
const User = db.users.getUserModel();
const mongoose = require("mongoose");

exports.updateUser = (req, res) => {
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

  User.findOne({ _id: userID }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (!foundUser) {
        console.log("Character Not Found!");
      } else {
        if (foundUser[updateField] !== updateValue) {
          foundUser[updateField] = updateValue;
          foundUser
            .save(foundUser)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while updating resource",
              });
            });
        }
      }
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.find({}, function (err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      res.send(foundUsers);
    }
  });
};

exports.getUser = (req, res) => {
  // Validate request
  if (!mongoose.isValidObjectId(req.body.userID)) {
    console.log("Invalid User Mongoose ID");
    res.status(400).send({ message: "Missing body contents!" });
    return;
  }

  User.findById(req.body.userID, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      res.send(foundUser);
    }
  });
};

exports.createUser = (req, res) => {
  const newUser = req.body.newUser;
  // Validate request
  if (!newUser.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = new User(newUser);
  // Save Character in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User",
      });
    });
};
