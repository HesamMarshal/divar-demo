const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const app = express();

  // Run Server
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}
main();
