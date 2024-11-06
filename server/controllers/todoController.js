const { default: mongoose } = require("mongoose");
const TodoList = require("../models/todoSchema");

exports.CreateTodo = async (req, res) => {
  try {
    const newPost = new TodoList({
      owner: req.user.id,
      title: req.body.title,
      content: req.body.content,
      tasks: req.body.tasks,
    });
    await newPost.save();
    res.status(201).json({
      message: "Todo list created successfully",
      list: newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
};

exports.addCollaborator = async (req, res) => {
  const listId = req.params.listId;
  const newCollaboratorId = req.body.id;

  console.log("listId:", listId);
  console.log("newCollaboratorId:", newCollaboratorId);

  const isFound = await TodoList.findOne({
    _id: listId,
  });

  if (!isFound) {
    res.status(404).json({
      message: "This list doesn't exist",
    });
    return;
  }
  const doesExist = isFound.collaborators.includes(newCollaboratorId);

  if (doesExist) {
    res.status(409).json({
      message: "Already a collaborator",
    });
    return;
  }

  await TodoList.updateOne(
    {
      _id: listId,
    },
    {
      $push: { collaborators: newCollaboratorId },
    }
  );

  const PopulateCollaborators = await TodoList.findOne({
    _id: listId,
  }).populate("collaborators");

  const CollaboratorList = PopulateCollaborators?.collaborators;

  res.status(200).json({
    message: "Collaborator Added Successfully",
    Collaborators: CollaboratorList,
  });
};

exports.removeCollaborator = async (req, res) => {
  const { listId, userId } = req.params;

  // const listId = await mongoose.Types.ObjectId(listId)
  // const userId = await mongoose.Types.ObjectId(userId)

  const isFound = await TodoList.findOne({
    _id: listId
  });

  if(!isFound){
    res.status(404).json({
      message: "Given Team doesn't exist"
    })
    return;
  }

  const doesExist = isFound.collaborators.includes(userId, 0);

  if(!doesExist){
    res.status(409).json({
      message: "Given Id doesn't belong to team"
    })
    return;
  }

  const details = await TodoList.updateOne({
    _id: listId
  }, {
    $pull: { collaborators: userId }
  })

  if(details.modifiedCount){
    res.json({
      message: "Successfully removed collaborator",
      details: details
    })
  } else {
    res.json({
      message: "Something went wrong!"
    })
  }  
}