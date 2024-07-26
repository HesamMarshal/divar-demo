const createHttpError = require("http-errors");
const AuthorizationMessage = require("../messages/auth.messages");
const jwt = require("jsonwebtoken");
const UserModel = require("../../modules/user/user.model");

require("dotenv").config();
const Authorization = async (req, res, next) => {
  try {
    // retrive token from cookie
    const token = req?.cookie?.access_token;

    // verify if token is available and valid
    if (!token) throw createHttpError.Unauthorized(AuthorizationMessage.Login);
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // retrive user using id in token
    if (typeof data === "object" && "id" in data.id) {
      const user = await UserModel.findById(data.id, {
        accessToken: 0,
        otp: 0,
      }).lean(); //get only simple information not all method

      if (!user)
        throw createHttpError.Unauthorized(AuthorizationMessage.NotFound);
      req.user = user;
      return next();
    }
    throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
  } catch (error) {
    next(error);
  }
};
