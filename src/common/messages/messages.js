const AuthMessage = Object.freeze({
  SendOtpSuccessfully: "OTP sent succefully",
  NotFound: "User Not Found",
  OtpCodeNotExpired: "OTP code not expired yet. please wait for a few seconds.",
  OtpCodeExpired: "OTP code expired. please ask for new OTP.",
  OtpCodeIsIncorrect: "OTP code is incorrect.",
  LoggedInSuccessfully: "You logged in successfully.",
  Login: "Please Login",
  LoginAgain: "Please Login Again",
  Unauthorized: "Unauthorized! Please Login",
  NotFound: "User Not Found",
  InvalidToken: "Token is invalid",
  LogoutSuccessfully: "Logged out successfully!",
});

const UserMessage = Object.freeze({});
const CategoryMessage = Object.freeze({
  CreatedSuccessfully: "Category Created Succesfully",
  NotFound: "Category Not Found",
  AlreadyExist: "Category Already Exists.",
  Deleted: "Category Deleted Successfully.",
});
const OptionMessage = Object.freeze({
  CreatedSuccessfully: "Option Created Succesfully",
  NotFound: "Option Not Found",
  AlreadyExist: "Option Already Exists.",
  Deleted: "Option Deleted Successfully.",
  UpdatedSuccessfully: "Option Updated Successfully.",
});

const PostMessage = Object.freeze({
  CreatedSuccessfully: "Post Created Succesfully",
  NotFound: "Post Not Found",
  AlreadyExist: "Post Already Exists.",
  Deleted: "Post Deleted Successfully.",
  UpdatedSuccessfully: "Post Updated Successfully.",
  RequestNotValid: "Request is not valid.",
});

module.exports = {
  AuthMessage,
  UserMessage,
  CategoryMessage,
  OptionMessage,
  PostMessage,
};
