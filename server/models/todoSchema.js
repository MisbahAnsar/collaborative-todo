const mongoose = require("mongoose");

// To-Do List Schema
const TodoListSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: {
      type: String,
      required: true
    },
    tasks: {type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true},
    // collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoList", TodoListSchema);

