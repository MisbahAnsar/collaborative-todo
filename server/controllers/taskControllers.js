const Task = require("../models/taskSchema");
const TodoList = require("../models/todoSchema");
const { wsEventMsg } = require("../utils/helper");

const createTask = (wss) => {
  return async (req, res) => {
    try {
      const todolistid = req.user.id;
      const listId = req.params.listId;

      console.log(
        `Attempting to add todo with ID: ${listId} by owner: ${todolistid}`
      );
      
      const { title, content, assignedBy, assignedTo, priority, dueDate } = req.body;
      
      // Convert string IDs to ObjectIds
      const assignedByObjectId = assignedBy ? new mongoose.Types.ObjectId(assignedBy) : null;
      const assignedToObjectId = new mongoose.Types.ObjectId(assignedTo);
      
      // Create new task with proper ObjectIds
      const newTask = await Task.create({
        title,
        content,
        assignedBy: assignedByObjectId,
        assignedTo: assignedToObjectId,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined
      });

      const pushingtasktoTodo = await TodoList.updateOne(
        { _id: listId },
        { $push: { tasks: newTask._id } }
      );

      if (!pushingtasktoTodo.modifiedCount) {
        throw new Error('Todo list not found or task not added');
      }

      const response = {
        message: "Task added successfully",
        task: newTask,
      };
      
      res.status(201).json(response);

      // Notify WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(response));
        }
      });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ 
        message: "Error creating task",
        error: error.message 
      });
    }
  };
};

const deleteTask = (wss) => {
  return async (req, res) => {
    try {
      const { taskId, listId } = req.params;
      const deleteTask = await Task.deleteOne({
        _id: taskId
      })
      
      const deleteList = await TodoList.updateOne({
        _id: listId
      },
      {
        $pull: { tasks: taskId }
      });

      if(deleteTask.deletedCount){
        res.status(200).json({
          message: "Task Deleted Successfully"
        })
        
        } else {
        res.status(404).json({
          message: "Task not found"
        })
      }
      
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
