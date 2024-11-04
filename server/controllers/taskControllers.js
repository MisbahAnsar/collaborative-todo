const Task = require("../models/taskSchema");

const createTask = (wss) => {
  return async (req, res) => {
    try {
      const todolistid = req.user.id;
      const listId = req.params.listid;

      console.log(
        `Attempting to add todo with ID: ${listId} by owner: ${todolistid}`
      );

      const newTask = new Task({
        title: req.body.title,
        content: req.body.content,
        assignedBy: req.user.id,
        assignedTo: req.body.assignedTo,
      });

      await newTask.save();
      const response = {
        message: "Task added successfully",
        task: newTask,
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

// const updateTask = async (req, res) => {
//     try {
//       const 
//     }
// }

const deleteTask = (wss) => {
  return async (req, res) => {
    try {
      const { listTaskId } = req.params; // Task ID from URL parameters
      const deletedTask = await Task.findByIdAndDelete(listTaskId);

      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      const response = {
         message: "Task deleted successfully"
      };

      res.status(200).json(response)
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(response));
        }
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the task" });
    }
  };
};



module.exports = { createTask, deleteTask };
