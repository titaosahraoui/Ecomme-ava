// Create and Send Token andSave in the Cookies
const sendToken = (user, statusCode, res) => {
  //create token for user

  const token = user.getJwtToken();

  // Options for the cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httponly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
