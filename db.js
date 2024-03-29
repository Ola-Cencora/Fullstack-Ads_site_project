const mongoose = require("mongoose");

const connectToDB = () => {
  const dbURI =
    process.env.NODE_ENV === "production"
      ? `mongodb+srv://olacencora:${process.env.DB_PASS}@clusteradverts.hukizlo.mongodb.net/MessageBoardDB?retryWrites=true&w=majority&appName=ClusterAdverts`
      : "mongodb://0.0.0.0:27017/MessageBoardDB";

  mongoose.connect(dbURI, {});
  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to the database");
  });

  db.on("error", (err) => console.log("Error " + err));
};

module.exports = connectToDB;
