const Task = require('../models/taskSchema');

const createTask = async( req,res ) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            content: req.body.content,
            assignedBy: req.body.assignedBy,
        });
        await newTask.save();
        res.status(201).json(newTask);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating post" });
      }
}

module.exports = createTask;