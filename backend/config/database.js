const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((con) => {
      console.log(
        "MongoDB Connected Successfully to host: " +
          con.connection.host
      );
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      process.exit(1);
    });
};

module.exports = connectDatabase; 
