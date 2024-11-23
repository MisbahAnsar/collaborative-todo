const mongoose = require("mongoose");

const TodoListSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}],
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoList", TodoListSchema);

