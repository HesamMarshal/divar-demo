const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Database.");
  })
  .catch((err) => {
    console.log(err?.message ?? "Connecting to DB failed!");
  });
