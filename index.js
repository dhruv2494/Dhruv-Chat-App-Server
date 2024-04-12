// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const PORT = process.env.PORT || 4000;

// const app = express();
// const server = http.createServer(app);

// const mongoose = require("mongoose");

// const io = new Server(server, {
//   cors: {},
// });

// app.use(bodyParser.json());
// const cors = require("cors");
// const userRoute = require("./routes/userRoutes");
// const soket = require("./soket/soket");

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("Connected!"))
//   .catch((e) => console.log(e));

// app.use(cors());

// app.use("/user", userRoute);

// app.get("/", (req, res) => {
//   res.send("Welcome to Socket.IO server!");
// });

// soket(server);

// server.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();

const mongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};

mongooseConnect();

app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Socket.IO server!");
});

// Set up Socket.io with Express
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const io = new Server(server, {
  cors: {},
});

io.on("connection", (socket) => {
  socket.join("room");

  socket.on("new-user-joined", (Name) => {
    socket.broadcast.to("room").emit("user-join", Name);
  });

  socket.on("send-msg", (msg) => {
    socket.broadcast.to("room").emit("receive-msg", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

module.exports = app;
