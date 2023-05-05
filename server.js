// 3rd Party Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Live server component

// Inter-project Imports
const db = require("./src/models");

// App Setup
const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./src/routes/charactersRoute")(app);
require("./src/routes/usersRoute")(app);


// set port, listen for requests
let PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
