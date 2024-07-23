const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const app = express();

  // Connect to DB
  require("./src/config/mongoose.config");

  // Run Server
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}
main();
