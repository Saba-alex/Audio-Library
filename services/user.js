const HttpError = require("../http.error");
const User = require("../models/user");

const findUserByEmail = async (email) => {
  const userEmail = await User.findOne({ email });
  return userEmail;

  if (!userEmail) {
    const error = new HttpError("user not found", 500);
    throw error;
  }
};

const signup = async (
  name,
  email,
  password,
  registrationDate,
  dateOfBirth,
  location
) => {
  const createdUser = new User({
    name,
    email,
    password,
    registrationDate,
    dateOfBirth,
    location,
  });
  await createdUser.save();

  if (!createdUser) {
    const error = new HttpError("Could not create a user", 500);
    throw error;
  }

  return createdUser;
};

const login = async (email, password) => {
  const user = await User.findOne({ email, password });

  if (!user) {
    const error = new HttpError("Could not login a user", 500);
    throw error;
  }

  return user;
};
exports.findUserByEmail = findUserByEmail;
exports.signup = signup;
exports.login = login;
