const express = require("express");
// const listController = require("../controller/listController");

const authanticateToken = require("../middlewares/auth");
const listController = require("../controller/listController");

const router = express.Router();

router.post("/", authanticateToken, listController.createTask);
router.get("/", authanticateToken, listController.getAllTasks);
router.get("/:id", authanticateToken, listController.getTaskById);
router.put("/:id", authanticateToken, listController.updateTask);
router.delete("/:id", authanticateToken, listController.deleteTask);

module.exports = router;
