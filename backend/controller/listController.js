const listService = require("../services/list.service");
const createTask = async (req, res) => {
  try {
    const { title, description, isCompletedTask, priority } = req.body;
    console.log("req.body", req.body);
    const userId = req.user.id;

    const task = await listService.createTask({
      title,
      description,
      isCompletedTask,
      priority,
      userId,
    });
    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const tasks = await listService.getAllTasks(userId);
    console.log(tasks);
    return res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const task = await listService.getTaskById(id, userId);
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updatedData = req.body;
    const task = await listService.updateTask(id, userId, updatedData);
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const success = await listService.deleteTask(id, userId);
    return res.status(204).json(success);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
