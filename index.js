const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
require("dotenv").config();

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
const chatRoute = require("./routes/chatRouter");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected!"))
  .catch((e) => console.log(e));

app.use(cors());

app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Socket.IO server!");
});

soket(server);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
