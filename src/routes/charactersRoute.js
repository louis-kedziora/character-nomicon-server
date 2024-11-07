module.exports = (app) => {
  const characters = require("../controllers/characterController");

  var router = require("express").Router();

  // For whatever reason axios get requests ignore the body so post is used instead
  // see here: https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request
  // For this code post requests and get requests will be used interchangably

  // Create a new Character
  router.post("/create", characters.createCharacter);

  // Retrieve character data from database
  router.post("/getone", characters.getOneCharacter);

  // Retrieve character(s) data from database
  router.post("/getmany", characters.getManyCharacters);


  router.post("/updatehp", characters.updateHP);
  router.post("/updateinfo", characters.updateInfo);
  router.post("/createresource", characters.createResource);
  router.post("/updateresource", characters.updateResource);
  router.post("/updatecharacter", characters.updateCharacter);



  app.use("/api/characters", router);
};
