const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.route");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");
const cookieParser = require("cookie-parser");

dotenv.config();

async function main() {
  const app = express();

  //   Connect to DB
  require("./src/config/mongoose.config");

  // Config to Get Datafrom frontend
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Add access to cookies
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  //   Use Swagger
  SwaggerConfig(app);

  // Router
  app.use(mainRouter);

  // Error Handlers
  NotFoundHandler(app);
  AllExceptionHandler(app);

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
