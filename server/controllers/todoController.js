const TodoList = require('../models/todoSchema');

const CreateTodo = async (req, res) => {
  try {
      const newPost = new TodoList({ 
          owner: req.user.id, 
          title: req.body.title,
          content: req.body.content,
      });
      res.status(201).json(newPost);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post' });
  }
};


module.exports = CreateTodo