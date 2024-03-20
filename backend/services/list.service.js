const List = require("../models/list");
// taskService.js

const createTask = async (taskData) => {
  try {
    const task = await List.create(taskData);
    return task;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllTasks = async (userId) => {
  try {
    console.log("task");
    console.log(userId);
    const allTasks = await List.find({ userId: userId });
    console.log(allTasks);

    if (!allTasks) throw res.status(404).json({ message: "No tasks found." });
    return allTasks;
  } catch (error) {
    throw error;
  }
};

const getTaskById = async (taskId, userId) => {
  try {
    const task = await List.findOne({ userId: userId, _id: taskId });
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    console.log(error);
    error.statusCode = 404;
    throw new Error(error.message);
  }
};

const updateTask = async (taskId, userId, updateData) => {
  try {
    const task = await List.findOneAndUpdate(
      { _id: taskId, userId: userId },
      { $set: updateData },
      { new: true }
    );
    if (!task) {
      throw Error("Task not updated");
    }
    return task;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId, userId) => {
  try {
    const success = await List.findOneAndDelete({
      _id: taskId,
      userId: userId,
    });
    if (!success) {
      throw Error("Task not deleted");
    }
    return success;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
