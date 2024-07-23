const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to Database.");
  })
  .catch((err) => {
    console.log(err?.message ?? "connect to DB failed!");
  });
