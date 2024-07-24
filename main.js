const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.route");

dotenv.config();

async function main() {
  const app = express();

  //   Connect to DB
  require("./src/config/mongoose.config");

  //   Use Swagger
  SwaggerConfig(app);

  // Router
  app.use(mainRouter);

  //   Run Server
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}
main();

// 1. Create and configure server
// 2. Configure and conncet to db
// 3. Configure and use Swagger
