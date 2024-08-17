const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swagger.config");

const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");
const cookieParser = require("cookie-parser");
const expressEjsLayouts = require("express-ejs-layouts");
const mainRouter = require("./src/app.routes");
const moment = require("jalali-moment");
const methodOverride = require("method-override");

dotenv.config();

async function main() {
  const app = express();

  // Connect to DB
  require("./src/config/mongoose.config");

  // Config to Get Data from frontend
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Add access to cookies
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  // Use Swagger
  SwaggerConfig(app);

  // Configure method-override
  app.use(methodOverride("_method"));

  // Configure ejs
  app.use(express.static("public"));
  app.use(expressEjsLayouts);
  app.set("view engine", "ejs");
  app.set("layout extractScripts", true);
  app.set("layout extractStyles", true);
  app.set("layout", "./layouts/panel/main.ejs"); // set the main layout, you can change when you want

  // Router
  app.use(mainRouter);

  // use Jalali Calendar Moment
  app.locals.moment = moment;

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
// 3. Error handler
// 4. Configure and use Swagger
// 5. Implement Swagger schema
// 6. UserModel
// 7. Implement Auth Module
// 8. Implement User Module
// 9. Implement Category Module
