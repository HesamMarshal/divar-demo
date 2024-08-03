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
});
const OptionMessage = Object.freeze({
  CreatedSuccessfully: "Option Created Succesfully",
  NotFound: "Option Not Found",
  AlreadyExist: "Option Already Exists.",
  Deleted: "Option Deleted Succefully.",
});

module.exports = { AuthMessage, UserMessage, CategoryMessage, OptionMessage };
