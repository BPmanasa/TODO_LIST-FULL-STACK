const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const userData = req.body;
    const user = await authService.registerUser(userData);
    res.status(201).json({
      message: "User registered Successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ message: error.message }); // Return 500 for unexpected errors
  }
};

const login = async (req, res) => {
  try {
    const userData = req.body;

    const { token, user } = await authService.loginUser(userData);
    res.status(200).json({
      message: "User Login Successful",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
