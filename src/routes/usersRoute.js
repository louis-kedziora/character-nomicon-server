module.exports = (app) => {
  const users = require("../controllers/userController");

  var router = require("express").Router();

  // For whatever reason axios get requests ignore the body so post is used instead
  // see here: https://stackoverflow.com/questions/46404051/send-object-with-axios-get-request
  // For this code post requests and get requests will be used interchangably

  // Create a new Character
  router.post("/create", users.createUser);

  // Retrieve character data from database
  router.post("/get", users.getUser);
  router.post("/getAll", users.getAllUsers);

  router.patch("/updateUser", users.updateUser);

  app.use("/api/users", router);
};
