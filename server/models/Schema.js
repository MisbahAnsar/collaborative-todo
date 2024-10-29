const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  username: String,
  email: { type: String, unique: true, required: true },
  password: String,
  profilePicture: String,
  bio: String,
  notifications: { type: Boolean, default: true },
});

// Task Schema
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  assignee: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: Date,
  subtasks: [{ title: String, completed: { type: Boolean, default: false } }],
});

// To-Do List Schema
const TodoListSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //yash
  title: String,
  tasks: [TaskSchema],
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], //rahul
});

// Models
const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);
const TodoList = mongoose.model('TodoList', TodoListSchema);

module.exports = {User, Task, TodoList}