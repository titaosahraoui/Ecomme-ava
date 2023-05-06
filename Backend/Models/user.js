const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "pls enter yout name"],
    maxLenght: [30, "pls do not exed 30 charecters "],
  },
  email: {
    type: String,
    required: [true, "pls enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valide email adress"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "your password should be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Emcrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password

userSchema.methods.compareFuckingPassword = async function (entredpassword) {
  return await bcrypt.compare(entredpassword, this.password);
};

// Returns JWT token

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIRES_TIME,
  });
};

// Generate password reset token

userSchema.methods.getResetPasswordToken = function () {
  //  Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // Set TokenExpireTime
  this.resetPasswordExpire = Date.now() + 30 * 26 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
