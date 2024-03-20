const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const taskRoutes = require("./routes/listRoute");
require("dotenv").config();
require("./Connection/connection");
// const { jwtStrategy } = require("./config/passport");
// const passport = require("passport");
const app = express();

app.use(cors());
app.options("*", cors());

// app.use(passport.initialize());
// passport.use("jwt", jwtStrategy);
app.use(express.json());

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v2", taskRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});

module.exports = app;
