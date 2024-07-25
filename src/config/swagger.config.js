const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
  const swaggerDocument = swaggerJSDoc({
    swaggerDefinition: {
      openapi: "3.0.1",
      info: {
        title: "divar-backend-demo",
        description: "botostart project course",
        version: "1.0.0",
      },
    },
    // apis: ["src/modules/**/*.swagger.js"],
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });

  const swagger = swaggerUi.setup(swaggerDocument, {});
  app.use("/docs", swaggerUi.serve, swagger);
}

module.exports = SwaggerConfig;
