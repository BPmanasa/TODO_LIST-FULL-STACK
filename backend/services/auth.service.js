const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ username: userData.username });
    const existingEmail = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Username already Exists");
    } else if (existingEmail) {
      throw new Error("This email is already registered");
    }

    const user = new User(userData);
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(userData.password, salt);

    user.password = hashedPassword;
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
const loginUser = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      throw new Error("This email is not registered");
    }

    const passwordCheck = await user.comparePassword(password);
    if (!passwordCheck) {
      throw new Error("Invalid Password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);
    return { token, user };
  } catch (error) {
    throw error;
  }
};

module.exports = { registerUser, loginUser };
