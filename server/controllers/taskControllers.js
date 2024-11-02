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
      res.status(201).json(newTask);

      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(newTask));
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating post" });
    }
  };
};

module.exports = createTask;
