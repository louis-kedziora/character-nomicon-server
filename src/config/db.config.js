
//Mongo Online DB
const mongoPassword = process.env.MONGOPASS;
module.exports = {
  url: "mongodb+srv://louis-kedziora:"+ mongoPassword +"@cluster0.zladf5u.mongodb.net/playersheetDB",
};

//Local DB
// module.exports = {
//   url: "mongodb://localhost:27017/playersheet_db",
// };
