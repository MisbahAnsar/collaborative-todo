const TodoList = require("../models/todoSchema");

exports.CreateTodo = async (req, res) => {
  try {
    const newPost = new TodoList({
      owner: req.user.id,
      title: req.body.title,
      content: req.body.content,
      tasks: req.body.tasks
    });
    await newPost.save();
    res.status(201).json({
      message: "Todo list created successfully",
      list: newPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
};

exports.removeTodo = async (req, res) => {
  try {
    const todolistid = req.user.id;
    const id = req.params.todolistid;
    
    console.log(
      `Attempting to delete todo with ID: ${id} by owner: ${todolistid}`
    );

    const deletedTodo = await TodoList.findOneAndDelete({
      _id: id,
      owner: todolistid,
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot delete post",
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todoId = req.user.id;
    const id = req.params.todoId;
    const { title, content }  = req.body

    console.log(`Attempting to delete todo with ID: ${id} by owner: ${todoId}`);
    
    const updateTodo = await TodoList.findByIdAndUpdate(
      { _id: id, owner: todoId },
      { title: title, content: content },
      { new: true }
    );

    if (!updateTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot update post",
    });
  }
};

