const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: false,
    minlength: 8,
    maxlength: 11,
    unique: true,
  },
  password: { type: String, minlength: 8, maxlength: 255, required: true },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["superAdmin", "user", "carOwner", "hotelOwner", "tourOwner"],
    default: "user",
  },
  accountName: {
    type: String,
  },
  idCardImage: {
    type: String,
  },
  address: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  bankName: {
    type: String,
  },
  resetCode: {
    type: String,
  },
  isTourOwner: {
    type: Boolean,
    default: false,
  },
  isRegister: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_TOKEN,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const validateUser = (user) => {
  const schema = {
    name: Joi.string().trim().optional(),
    email: Joi.string().email().required().email(),
    phone: Joi.string().min(8).max(11).optional(),
    password: Joi.string().min(8).max(255).required(),
    image: Joi.string().optional(),
    role: Joi.string()
      .required()
      .valid("superAdmin", "user", "carOwner", "hotelOwner", "tourOwner"),
    accountName: Joi.string().optional(),
    idCardImage: Joi.string().optional(),
    address: Joi.string().optional(),
    accountNumber: Joi.string().optional(),
    bankName: Joi.string().optional(),
  };

  return Joi.validate(user, schema);
};

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.ValidateUser = validateUser;
