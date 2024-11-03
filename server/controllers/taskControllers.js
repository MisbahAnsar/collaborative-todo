const Task = require("../models/taskSchema");

const createTask = (wss) => {
  return async (req, res) => {
    try {
      const newTask = new Task({
        title: req.body.title,
        content: req.body.content,
        assignedBy: req.body.assignedBy,
      });
      await newTask.save();
      const response = {
        message: "Task added successfully",
        task: newTask
      };
      res.status(201).json(response);

      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(response));
        }
      });
    } catch {
      res.status(500).json({ message: "Error creating post" });
    }
  };
};
const deleteTask = async (req, res) => {
  try {
    const { listTaskId } = req.params; // Task ID from URL parameters
    const deletedTask = await Task.findByIdAndDelete(listTaskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log(`Attempting to delete task with ID: ${listTaskId} by owner: ${deletedTask}`);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "An error occurred while deleting the task" });
  }
};

module.exports = { createTask, deleteTask };
