const Task = require("../models/taskSchema");
const TodoList = require("../models/todoSchema");

const createTask = (wss) => {
  return async (req, res) => {
    try {
      const todolistid = req.user.id;
      const listId = req.params.listId;

      console.log(
        `Attempting to add todo with ID: ${listId} by owner: ${todolistid}`
      );
      
      //destructuring 
      const { title, content, assignedBy, assignedTo } = req.body;
      
      const newTask = await Task.create({ title, content, assignedBy, assignedTo });

      const pushingtasktoTodo = await TodoList.updateOne({
        _id: listId
      },
    {
      $push: { tasks: newTask._id }
    })

      // await newTask.save();
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
