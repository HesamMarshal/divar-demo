const { ErrorMessage } = require("../messages/messages");

function NotFoundHandler(app) {
  app.use((req, res, next) => {
    res.status(404).json({
      message: ErrorMessage.RouteNotFound,
    });
  });
}
module.exports = NotFoundHandler;
