const express = require("express");
const authController = require("../controller/auth.controller");

const router = express.Router();
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");

// TODO: CRIO_TASK_MODULE_AUTH - Implement "/v1/auth/register" and "/v1/auth/login" routes with request validation
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);

module.exports = router;
