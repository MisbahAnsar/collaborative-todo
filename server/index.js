const express = require("express");
const dotenv = require("dotenv");
const ConnectingDB = require("./config/db");
const router = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");
const taskRouter = require("./routes/taskRoutes");
const { WebSocketServer } = require("ws");

dotenv.config();

const app = express();
ConnectingDB();

app.use(express.json());
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  ws.on("message", (data) => {
    console.log("received:", data);
  });

  ws.send("Hello! Message From Server!!");
});

app.use("/user", router);
app.use("/list", todoRouter);
app.use("/list", taskRouter(wss));

// tommorow jinwoo, export wss from index.js, 
// nd import it in helper nd then make it work on 
// the taskController, nd remove the wss from the 
// taskRoute which u r currently sending as a prop