const TodoList = require('../models/todoSchema');

exports.CreateTodo = async (req, res) => {
  try {
      const newPost = new TodoList({ 
          owner: req.user.id, 
          title: req.body.title,
          content: req.body.content,
      });
      await newPost.save();
      res.status(201).json(newPost);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post' });
  }
};

exports.removeTodo = async (req, res) => {
  try {
    const todolistid = req.user.id;
    const id = req.params;
    
    const deletedTodo = await TodoList.findOneAndDelete({ _id: id, owner: todolistid });
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({
      message: "todo deleted successfully"
    })
  } catch (error){
    console.error(error);
    res.status(500).json({
      message: 'Cannot delete post'
    })
  }
}

