// const passport = require("passport");
// const httpStatus = require("http-status");
// const ApiError = require("../utils/ApiError");

// /**
//  * Custom callback function implementation to verify callback from passport
//  * - If authentication failed, reject the promise and send back an ApiError object with
//  * --- Response status code - "401 Unauthorized"
//  * --- Message - "Please authenticate"
//  *
//  * - If authentication succeeded,
//  * --- set the `req.user` property as the user object corresponding to the authenticated token
//  * --- resolve the promise
//  */

// const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
//   try {
//     if (err || !user) {
//       return reject(
//         new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
//       );
//     }

//     const currentTimeStamp = Math.floor(Date.now() / 1000);

//     if (user.exp && user.exp < currentTimeStamp) {
//       return reject(new ApiError(httpStatus.UNAUTHORIZED, "Token has expired"));
//     }

//     req.user = user;
//     resolve();
//   } catch (error) {
//     reject(error);
//   }
// };

// /**
//  * Auth middleware to authenticate using Passport "jwt" strategy with sessions disabled and a custom callback function
//  *
//  */
// const auth = async (req, res, next) => {
//   return new Promise((resolve, reject) => {
//     passport.authenticate(
//       "jwt",
//       { session: false },
//       verifyCallback(req, resolve, reject)
//     )(req, res, next);
//   })
//     .then(() => next())
//     .catch((err) => next(err));
// };

// module.exports = auth;

const jwt = require("jsonwebtoken");

const authanticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401); // The user is unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Not a valid token
    }

    req.user = user;
    next(); // Continue to the next middleware
  });
};

module.exports = authanticateToken;
