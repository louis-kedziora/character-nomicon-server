const db = require("../models");
const Character = db.characters.getModel();
const mongoose = require("mongoose");

// This is inefficent for validation in terms of if anything has been changed
//    because everything about the character is being overwritten and
//    additonally, we have to check if at least one of those things is changed
exports.updateCharacter = async (req, res) => {
  if (!req.body.newCharacter || !req.body.newCharacter._id) {
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }
  const newCharacter = req.body.newCharacter;
  const characterID = newCharacter._id;

  try {
    let foundCharacter = await Character.findOne({ _id: characterID });
    if (!foundCharacter) {
      console.log("Character Not Found!");
    } else {
      let hasAnythingChanged = false;
      // console.log("Database Character:");
      // console.log(foundCharacter);

      Object.keys(newCharacter).forEach((key) => {
        if (key !== "_id") {
          if (hasAnythingChanged === false) {
            if (foundCharacter[key] !== newCharacter[key]) {
              hasAnythingChanged = true;
            }
          }
          foundCharacter[key] = newCharacter[key];
        }
      });

      if (hasAnythingChanged === true) {
        // console.log("*********************************************************");
        // console.log("Updated Character:");
        await foundCharacter.save();
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message || "Some error occurred while updating resource",
    });
  }
};

exports.createResource = async (req, res) => {
  if (!req.body || !req.body.characterID || !req.body.newResource.resourceID) {
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }

  const characterID = req.body.characterID;
  const newResource = req.body.newResource;

  try {
    let foundCharacter = await Character.findOne({ _id: characterID });
    if (!foundCharacter) {
      console.log("Character Not Found!");
    } else {
      foundCharacter.customResources.push(newResource);
      await foundCharacter.save();
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating resource",
    });
  }
};

exports.updateResource = async (req, res) => {
  if (!req.body || !req.body.characterID || !req.body.resourceID) {
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }
  const characterID = req.body.characterID;
  const resourceID = req.body.resourceID;
  const newValue = req.body.newValue;

  try {
    let foundCharacter = await Character.findOne({ _id: characterID });
    if (!foundCharacter) {
      console.log("Character Not Found!");
    } else {
      let customResources = foundCharacter.customResources;
      let foundResource = customResources.find(
        (item) => item.resourceID === resourceID
      );
      if (foundResource.currentResourceValue !== newValue) {
        foundResource.currentResourceValue = newValue;
        await foundCharacter.save();
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating resource",
    });
  }
};

exports.getManyCharacters = async (req, res) => {
  // Validate request
  req.body.characterIDs.forEach((characterID, index) => {
    if (!mongoose.isValidObjectId(characterID)) {
      console.log("Invalid Character Mongoose ID");
      res.status(400).send({ message: "Missing body contents!" });
      return;
    }
  });

  try {
    const foundCharacters = await Character.find({
      _id: { $in: req.body.characterIDs },
    });
    res.send(foundCharacters);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while fetching characters",
    });
  }
};

exports.getOneCharacter = async (req, res) => {
  // Validate request
  if (!mongoose.isValidObjectId(req.body.characterID)) {
    console.log("Invalid Character Mongoose ID");
    res.status(400).send({ message: "Missing body contents!" });
    return;
  }

  try {
    const foundCharacter = await Character.findOne({
      _id: req.body.characterID,
    });
    if (!foundCharacter) {
      console.log("Character Not Found!");
    } else {
      res.send(foundCharacter);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while fetching character",
    });
  }
};

exports.createCharacter = async (req, res) => {
  // Validate request
  if (!req.body.newCharacter || !req.body.newCharacter._id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const character = new Character(req.body.newCharacter);
  // Save Character in the database

  try {
    await character.save();
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Character",
    });
  }
};

exports.updateInfo = async (req, res) => {
  if (!req.body || !req.body.characterID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const characterID = req.body.characterID;
  let updateData = req.body;
  delete updateData.characterID;
  const updateField = Object.keys(updateData)[0];
  const updateValue = Object.values(updateData)[0];

  try {
    let foundCharacter = await Character.findOne({ _id: characterID });
    if (!foundCharacter) {
      console.log("Character Not Found!");
    } else {
      if (foundCharacter[updateField] !== updateValue) {
        foundCharacter[updateField] = updateValue;
        await foundCharacter.save();
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating resource",
    });
  }
};

exports.updateHP = async (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.characterID || typeof req.body.newHP !== "number") {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const { characterID, newHP } = req.body;
  try {
    let foundCharacter = await Character.findOne({ _id: characterID });
    if (!foundCharacter) {
      console.log("Character Not Found!");
    } else {
      if (foundCharacter.currentHP !== newHP) {
        foundCharacter.currentHP = newHP;
        await foundCharacter.save();
      }
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating character HP",
    });
  }
};
