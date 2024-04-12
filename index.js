const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

const mongoose = require("mongoose");

const io = new Server(server, {
  cors: {},
});

app.use(bodyParser.json());
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const soket = require("./soket/soket");

mongoose
  .connect("mongodb://127.0.0.1:27017/socket_io_learning")
  .then(() => console.log("Connected!"))
  .catch((e) => console.log(e));

app.use(cors());

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Socket.IO server!");
});

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);
//   socket.join("room");
//   socket.on("new-user-joined", (Name) => {
//     socket.broadcast.to("room").emit("user-join", Name);
//   });
//   socket.on("send-msg", (msg) => {
//     socket.broadcast.to("room").emit("receive-msg", msg);
//   });
// });

soket(server);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
